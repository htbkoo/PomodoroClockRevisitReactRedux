// @flow
import React, {Component} from 'react';
import './App.css';
import Clock from "./components/Clock";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";

const DEFAULT_TIME = 1500000;

type Props = {};

class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <Clock time={DEFAULT_TIME}/>
                <TimeTicker/>
                <ButtonsPanel/>
            </div>
        );
    }
}

export default App;
