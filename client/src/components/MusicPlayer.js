import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import "../css/Player.css";
class MusicPlayer extends Component {

    render(){
        var { currentSong, item, progress_ms, handleInputChange } = this.props;

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

        const progressBarStyle = {
            width: (progress_ms * 100 / item.duration_ms) + '%'
          };
        return(
            <div className="musicplayer">
                <div className="track-div">
                    <img 
                        src={currentSong.photoURL}
                        alt="album-art"
                    />
                    <div className="progress">
                    <div  className="progress__bar"
                            style={progressBarStyle}
                    />
                    </div>
                    <div className = "now-playing__status">
                        {this.props.is_playing? "Playing": "Paused"}
                    </div>
                    <h4 className="song-title">{songTitle}</h4>
                    <p>{artistsString}</p>
                </div>

                <div className="player-input">
                    <Form>
                        <Form.Field>
                            <label htmlFor="user-answer">The Song is</label>
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