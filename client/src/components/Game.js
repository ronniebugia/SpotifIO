import React, { Component } from 'react';
import "../css/game.css";
import Scoreboard from "./Scoreboard";
import MusicPlayer from "./MusicPlayer";
import NewUser from "./NewUser";
import InfoBar from './InfoBar';
import Messages from './Messages';
import Input from './Input';

import Spotify from 'spotify-web-api-js';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:8888";
const socket  = socketIOClient(ENDPOINT);
var spotifyWebAPI = new Spotify();


class Game extends Component {
    // Constructor for Entire Game
    constructor(){
        super();
        const params = this.getHashParams();
        this.state = {
            currentPlayer:null,
            listPlayers:[],
            players: [],
            songPool: [],
            loggedIn: params.access_token ? true: false,
            currentSong:{
                title: "",
                artists: [],
                photoURL:""
            },
            messagesHtml:[]
        }

        this.userSendingMessage = this.userSendingMessage.bind(this);
        this.newUserPressedEnter = this.newUserPressedEnter.bind(this);

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
                    this.setState({
                        ...this.state,
                        currentSong:{
                            title:title,
                            photoURL:photoURL,
                            artists: artists
                        }
                    });
                }
            }
        )
    }

    // Socket IO Functions
    socketIOfunctions() {

        socket.on('chat-message', messages => {
            let messagesHtml = [];
            for (let i of messages) {
                messagesHtml.push(<p>{i}</p>);
            }
            this.setState({
                ...this.state,
                messagesHtml
            });
        });

        socket.on('new-user-joined', users => {
            this.setState({
                ...this.state,
                players: users
            });
        })
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

                    this.setState({
                        songPool: playlistTracks,
                        currentSong:{
                            title:title,
                            photoURL:photoURL,
                            artists: artists,
                            index: randomIndex
                        }
                    })
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        }

        this.socketIOfunctions();
    }

    // Handles User Input Change
    userSendingMessage(e){
        var { currentPlayer } = this.state;
        if(e.key === 'Enter'){
            let messageString = currentPlayer + ": " + e.target.value;
            let userInput = e.target.value.toLowerCase();
            let answer = this.state.currentSong.title.toLocaleLowerCase();
            // User for the answer right
            if(userInput === answer){
                e.target.style.border = "1px solid green";
                e.target.value = "";
                messageString = currentPlayer + " got the song";
                spotifyWebAPI.skipToNext().then(
                    (newSong) => {
                        console.log(newSong);
                    }
                );
            }
            socket.emit('send-chat-message', messageString);
        }
    }




    // Handles New User Input 
    newUserPressedEnter(e){
        if(e.key === 'Enter'){
            let userName = e.target.value;
            socket.emit('new-user', userName);
            this.setState({
                ...this.state,
                currentPlayer: userName
            });
        }
    }

    // React Render Function
    render(){
        this.getNowPlaying();
        this.socketIOfunctions();

        return(
            <div className="game">

                {this.state.currentPlayer ? 
                <div>
                    <MusicPlayer 
                        currentSong={this.state.currentSong}
                        userSendingMessage={this.userSendingMessage}
                        messagesHtml={this.state.messagesHtml}
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
                :
                <NewUser
                    newUserPressedEnter={this.newUserPressedEnter}
                />
                }
            </div>
        )
    }
}

export default Game;