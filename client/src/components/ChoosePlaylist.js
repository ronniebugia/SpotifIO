import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import Spotify from 'spotify-web-api-js';

var spotifyWebAPI = new Spotify();

class ChoosePlaylist extends Component {
    // Constructor for Entire Game
    constructor(){
        super();
        const params = this.getHashParams();
        this.state = {
            playlists:[],
            chosenPlaylist:{
                listId:"",
                listName:""
            }
        }


        if(params.access_token){
            spotifyWebAPI.setAccessToken(params.access_token);
        }

        this.selectList = this.selectList.bind(this);
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

    selectList = (e, playlist) => {
        const params = this.getHashParams();
        window.location = "/#playlist_id=" + playlist.id + "&&access_token=" + params.access_token;
        spotifyWebAPI.getPlaylistTracks(playlist.id).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
        this.setState({
            ...this.state,
            chosenPlaylist:playlist
        })
    }
    
    // React Render Function
    render(){
        var playlists = this.state.playlists;
        var playlistsDiv = [];
        console.log(playlists);
        for(let playlist of playlists){
            playlistsDiv.push(
                <Segment 
                    key={playlist.id} 
                >
                    <h4>{playlist.name}</h4>
                    <Button 
                        onClick={(e) => this.selectList(e, playlist)}
                    >
                        Select List
                    </Button>
                </Segment>
            )
        }
        return(
            <div className="playlist-picker">
                <h4>Spotif.io</h4>
                <p>Choose a Playlist</p>
                <h4>Chosen:</h4>
                <h4>{this.state.chosenPlaylist.name}</h4>
                <p>{this.state.chosenPlaylist.id}</p>
                {playlistsDiv}
            </div>
        )
    }
}

export default ChoosePlaylist;