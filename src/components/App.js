import React, { Component } from 'react';

import { createGame } from '../lib/game';


class App extends Component {
    
    constructor(props) {
        super(props);

        this.game = createGame();

        this.state = {}
    }

    render () {
        return (
            <div>
                <h1>Lights Out</h1>
            </div>
        )
    }
}

export default App