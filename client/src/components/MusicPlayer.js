import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

class MusicPlayer extends Component {


    render(){
        var { currentSong, onKeyPressEnter } = this.props;

        // String that hides the song title
        var songTitle = "";
        for(let i=0; i < currentSong.title.length; i++){
            let ch = currentSong.title[i];
            if ((ch === ' ') || (ch === '\t') || (ch === '\n')){
                songTitle += " ";
            }else{
                songTitle += "_"
            }
        }

        // String that displays the artists names
        var artistsString = "";
        for(let artist of currentSong.artists){
            artistsString = artistsString + artist + ", ";
        }
        artistsString = artistsString.substr(0, artistsString.length - 2);

        return(
            <div className="musicplayer">
                <div className="track-div">
                    <img 
                        src={currentSong.photoURL}
                        alt="album-art"
                    />
                    <h4 className="song-title">{songTitle}</h4>
                    <p>{artistsString}</p>
                </div>

                <div className="player-input">
                    <div>

                        <br></br>
                        CHAT BOX
                        
                        <br></br>
                        
                        GOES HERE

                        <br></br>
                    </div>
                    <Form>
                        <Form.Field>
                            <label htmlFor="user-answer">The Song is</label>
                            <input 
                                id="user-answer" 
                                name="user-answer"
                                onKeyPress={onKeyPressEnter}
                            ></input>
                        </Form.Field>
                    </Form>
                </div>
            </div>
        )
    }
}

export default MusicPlayer;