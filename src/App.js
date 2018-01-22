// @flow
import React, {Component} from 'react';
import './App.css';
import Timer from "./components/Timer";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";

type Props = {};

class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <Timer/>
                <TimeTicker/>
                <ButtonsPanel/>
            </div>
        );
    }
}

export default App;
