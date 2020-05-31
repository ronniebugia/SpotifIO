import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Spotify from 'spotify-web-api-js';

var spotifyWebAPI = new Spotify();

class SetSongs extends Component {
    // Constructor for Entire Game
    constructor(){
        super();
        const params = this.getHashParams();
        this.state = {
            playlists:[]
        }


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

    async componentDidMount(){
        // Fetch user playlists
        await spotifyWebAPI.getUserPlaylists().then(
            (res) => {
                this.setState({
                    ...this.state,
                    playlists: res.items
                });
            }
        );
    }
    
    // React Render Function
    render(){
        var playlists = this.state.playlists;
        var playlistsDiv = [];
        console.log(playlists);
        for(let playlist of playlists){
            playlistsDiv.push(
                <Segment key={playlist.id}>
                    <h4>{playlist.name}</h4>
                    <p>{playlist.description}</p>
                </Segment>
            )
        }
        return(
            <div className="playlist-picker">
                <h4>Spotif.io</h4>
                <p>Choose a Playlist</p>
                {playlistsDiv}
            </div>
        )
    }
}

export default SetSongs;