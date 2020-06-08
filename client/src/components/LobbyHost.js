import React, { Component } from 'react';
import "../css/LobbyHost.css";
import {Dropdown, Form} from 'semantic-ui-react'

class LobbyHost extends Component {

    roundOptions = [
        {
            text:'1',
            value:'1',
        },
        {
            text:'2',
            value:'2',
        },
        {
            text:'3',
            value:'4',
        },
        {
            text:'5',
            value:'5',
        },


    ]

    guessTimeOptions = [
        {
            text:'5',
            value:'5',
        },
        {
            text:'10',
            value:'10',
        },
        {
            text:'15',
            value:'15',
        },
        {
            text:'20',
            value:'20',
        },


    ]
    render(){
        return(
            <div className="container-fluid" >
                <div className = "Header">
                    <div id="containerLogoSmall">
                        <div className="logoSmallWrapper">
                            {/*need to fix the destination of this link back to the main page*/}
                            <a href="/">
                                <img className="logo logoSmall" src = {"https://www.drmare.com/images/resource/spotify-shuffle-mode.jpg"} />
                            </a>
                        </div>

                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-x1-5 col-lg-6 col-md-8 text-center px-2">
                        <div> <h3 id="game-code"> </h3> </div>
                        <div id="game-options">
                            <div className="header-container">
                                <div className="gameSettings">
                                    <div className="Title"> Settings</div>
                                    <div className="lobbySettings">
                                        <div className="lobbyName"> Lobby</div>
                                        <div className="lobbySectionSettings">
                                            <div className= "form-group">
                                                <label for = "lobbySetRounds"> Rounds:  </label>
                                                <Dropdown
                                                    placeholder={'Select Number of Rounds'}
                                                    options={this.roundOptions}>
                                                </Dropdown>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="lobbySetGuessTime"> GuessTime: </label>
                                                <Dropdown
                                                    placeholder={'Select How Long to Guess'}
                                                    options={this.guessTimeOptions}>
                                                </Dropdown>
                                            </div>

                                        </div>
                                        <div className="lobbyContentButtons">
                                            <button className="button btn btn-success" id="buttonLobbyPlay"> Start Game </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>




    )



    }





}
export default LobbyHost;