// @flow
import React, {Component} from 'react';
import './App.css';
import Clock from "./components/Clock";

type Props = {};

class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <Clock/>
            </div>
        );
    }
}

export default App;
