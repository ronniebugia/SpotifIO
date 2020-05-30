import React, { Component } from 'react';
import "../css/game.css";
import Scoreboard from "./Scoreboard";
import MusicPlayer from "./MusicPlayer";

import Spotify from 'spotify-web-api-js';

var spotifyWebAPI = new Spotify();

class Game extends Component {
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
                title: "Day 'N' Nite",
                artist: "Kid Cudi",
                photoURL:"https://images.genius.com/cf6062f7a401be02a5aec991a6bb0039.620x615x1.jpg"
            },
            seconds:0
        }

        this.handleInputChange = this.handleInputChange.bind(this);

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
                var title = res.item.name;
                var photoURL = res.item.album.images[0].url;
                var artist = res.item.artists[0].name;
                this.setState({
                    ...this.state,
                    currentSong:{
                        title:title,
                        photoURL:photoURL,
                        artist: artist
                    }
                })
            }
        )
    }

    
    handleInputChange(e){
        let userInput = e.target.value.toLowerCase();
        let answer = this.state.currentSong.title.toLocaleLowerCase();
        if(userInput === answer){
            e.target.style.color = "green";
            e.target.value = "";
            spotifyWebAPI.skipToNext().then(
                (res) => {
                    console.log(res);
                }
            );
        }
    }
    

    render(){
        this.getNowPlaying();
        return(
            <div className="game">
                <MusicPlayer 
                    currentSong={this.state.currentSong}
                    handleInputChange={this.handleInputChange}
                />
                <Scoreboard 
                    players={this.state.players} 
                />
            </div>
        )
    }
}

export default Game;