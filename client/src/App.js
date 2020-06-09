import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Game from "./components/Game";
import SetSongs from "./components/SetSongs";

import New from "./components/New";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    
    
    render(){
        return(
            <BrowserRouter>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <script src="https://sdk.scdn.co/spotify-player.js"></script>
                <a href="http://localhost:8888">Log In</a>
                
                <Route path="/" exact component={Game}></Route>
                <Route path="/choose-playlist" exact component={SetSongs}></Route>
                
                
                <Route path="/new" exact component={New}></Route>
                
            </BrowserRouter>
        )
    }
}

export default App;