import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from "react-router-dom";

import Game from "./components/Game";
import SetSongs from "./components/SetSongs";
import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyHost from "./components/LobbyHost";
import {render} from "react-dom";
import {Switch} from "react-bootstrap";


class App extends Component {

    
    render(){
        return(
            <BrowserRouter>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <script src="https://sdk.scdn.co/spotify-player.js"></script>
                <a href="http://localhost:8888">Log In</a>
                <Link to="/LobbyHost"> Host Game </Link>
                <Route path ="/LobbyHost" component = {LobbyHost} />









            </BrowserRouter>
        );
    }
}

export default App;