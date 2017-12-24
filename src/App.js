// @flow
import React, {Component} from 'react';
import './App.css';
import Clock from "./components/Clock";

type Props = {};

class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <Clock time={0}/>
            </div>
        );
    }
}

export default App;
