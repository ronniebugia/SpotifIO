import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

class MusicPlayer extends Component {

    render(){
        var { currentSong, handleInputChange } = this.props;

        var songTitle = "";
        for(let i=0; i < currentSong.title.length; i++){
            let ch = currentSong.title[i];
            if ((ch === ' ') || (ch === '\t') || (ch === '\n')){
                songTitle += " ";
            }else{
                songTitle += "_"
            }
        }

        return(
            <div className="musicplayer">
                <div className="track-div">
                    <img 
                        src={currentSong.photoURL}
                        alt="album-art"
                    />
                    <h4 className="song-title">{songTitle}</h4>
                    <p>{currentSong.artist}</p>
                </div>

                <div className="player-input">
                    <Form>
                        <Form.Field>
                            <label for="user-answer">The Song is</label>
                            <input 
                                id="user-answer" 
                                name="user-answer"
                                onChange={handleInputChange}
                            ></input>
                        </Form.Field>
                    </Form>
                </div>
            </div>
        )
    }
}

export default MusicPlayer;