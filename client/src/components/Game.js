import React, { Component } from 'react';
import "../css/game.css";
import Scoreboard from "./Scoreboard";
import MusicPlayer from "./MusicPlayer";
import InfoBar from './InfoBar';
import Messages from './Messages';
import Input from './Input';

import Spotify from 'spotify-web-api-js';

var spotifyWebAPI = new Spotify();

class Game extends Component {
    // Constructor for Entire Game
    constructor(){
        super();
        const params = this.getHashParams();
        this.state = {
            players: [
                {name:'Ronnie', score:0},
                {name:'Anand', score:0},
                {name:'Kaeli', score:0},
                {name:'Edward', score:0},
            ],
            songPool: [],
            loggedIn: params.access_token ? true: false,
            currentSong:{
                title: "",
                artists: [],
                photoURL:""
            },
            play: {
                playerInstance: null,
                spot_uri: "",
            }
        }

        this.onKeyPressEnter = this.onKeyPressEnter.bind(this);

        if(params.access_token){
            spotifyWebAPI.setAccessToken(params.access_token);
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    // Function to Get Song that is now playing on my Spotify Account
    getNowPlaying(){
        spotifyWebAPI.getMyCurrentPlaybackState().then(
            (res) => {
                if(res.item){
                    var title = res.item.name;
                    var photoURL = res.item.album.images[0].url;
                    var artists = []
                    for(let artist of res.item.artists){
                        artists.push(artist.name);
                    }
                    newURI = res.item.uri;
                    newPlayer = new Spotify.Player({
                        name: 'Game Music Player',
                        getOAuthToken: callback => {
                          callback(params.access_token);
                        }
                      });
                    this.setState({
                        ...this.state,
                        currentSong:{
                            title:title,
                            photoURL:photoURL,
                            artists: artists
                        },
                        play: {
                            playerInstance: newPlayer,
                            spot_uri: newURI,
                        }
                    }).then(res2 =>{
                        this.state.play.playerInstance.connect().then(res3 =>
                                {
                                    if(res3){
                                        // successfully connected
                                    } else {
                                        throw new Error("unable to connect Web Playback SDK to spotify");
                                    }
                                }
                            )
                        }
                    );
                }
            }
        );
    }

    // Pre Checks before Render Function
    componentDidMount(){
        const params = this.getHashParams();
        // Read URL to see if playlist has been chosen
        if(params.playlist_id){
            spotifyWebAPI.getPlaylistTracks(params.playlist_id).then(
                res => {
                    // Choose Random Song from playlist tracks
                    var playlistTracks = res.items;
                    var randomIndex = Math.floor(Math.random() * playlistTracks.length);
                    var randomSong = playlistTracks[randomIndex].track;
                    var title = randomSong.name;
                    var photoURL = randomSong.album.images[0].url;
                    var artists = []
                    for(let artist of randomSong.artists){
                        artists.push(artist.name);
                    }
                    newURI = res.item.uri;
                    newPlayer = new Spotify.Player({
                        name: 'Game Music Player',
                        getOAuthToken: callback => {
                          callback(params.access_token);
                        }
                      });
                    this.setState({
                        songPool: playlistTracks,
                        currentSong:{
                            title:title,
                            photoURL:photoURL,
                            artists: artists,
                            index: randomIndex
                        },
                        play: {
                            playerInstance: newPlayer,
                            spot_uri: newURI,
                        }
                    }).then(res2 =>{
                        this.state.play.playerInstance.connect().then(res3 =>
                                {
                                    if(res3){
                                        // successfully connected
                                    } else {
                                        throw new Error("unable to connect Web Playback SDK to spotify");
                                    }
                                }
                            )
                        }
                    );
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        }
    }

    // Handles User Input Change
    onKeyPressEnter(e){
        if(e.key === 'Enter'){
            let userInput = e.target.value.toLowerCase();
            let answer = this.state.currentSong.title.toLocaleLowerCase();
            if(userInput === answer){
                e.target.style.border = "1px solid green";
                e.target.value = "";
                alert("Correct");
                // spotifyWebAPI.skipToNext();
            }
        }
    }

    // React Render Function
    render(){
        // this.getNowPlaying();

        return(
            <div className="game outerContainer">
                <MusicPlayer 
                    currentSong={this.state.currentSong}
                    onKeyPressEnter={this.onKeyPressEnter}
                />
                {/* <div className="outerContainer">
                    <div className="container">
                        <InfoBar room={room} />
                        <Messages messages={messages} name={name} />
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </div>
                    <TextContainer users={users}/>
                </div> */}
                <Scoreboard 
                    players={this.state.players} 
                />
            </div>
        )
    }
}

export default Game;