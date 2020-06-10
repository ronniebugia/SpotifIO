import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Game from "./components/Game";
import Chat from "./components/Chat/Chat";
// import InfoBar from "./components/Chat/InfoBar";
import Input from "./components/Chat/Input";
import Message from "./components/Chat/Message";
import Messages from "./components/Chat/Messages";
import SetSongs from "./components/SetSongs";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

    
    render(){
        return(
            <BrowserRouter>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <script src="https://sdk.scdn.co/spotify-player.js"></script>
                <a href="http://localhost:8888">Log In</a>
                <Route path="/" exact component={Game}></Route>
                <Route path="/" exact component={Chat}></Route>
                <Route path="/" exact component={Input}></Route>
                <Route path="/" exact component={Message}></Route>
                <Route path="/" exact component={Messages}></Route>
                <Route path="/choose-playlist" exact component={SetSongs}></Route>
            </BrowserRouter>
        )
    }
}

export default App;