import React, { Component } from 'react';
import { Segment, Icon } from 'semantic-ui-react'

class Scoreboard extends Component {
    
    render(){
        var { players } = this.props;

        console.log(players);

        var board = [];
        for(let player of players){
            board.push(
                <Segment key={player.name}>
                    <h4>{player.name}</h4>
                    <p>Score: {player.score}</p>
                </Segment>
            )
        }
        return(
            <div className="scoreboard">
                <Segment.Group color='green'>
                    <Segment>
                        <h2>Spotif.io</h2>
                    </Segment>
                    <Segment>
                        <p>Room Code: <a href="/">HXJWT <Icon name='copy outline' /></a></p>
                    </Segment>
                </Segment.Group>
                <div>
                    {board}
                </div>
            </div>
        )
    }
}

export default Scoreboard;