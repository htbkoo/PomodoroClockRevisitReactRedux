// @flow
import React, {Component} from 'react';
import './App.css';
import Clock from "./components/Clock";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";

type Props = {};

class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <Clock/>
                <TimeTicker/>
                <ButtonsPanel/>
            </div>
        );
    }
}

export default App;
