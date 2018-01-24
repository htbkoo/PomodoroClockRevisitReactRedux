// @flow
import React, {Component} from 'react';
import './App.css';
import Timer from "./components/Timer";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";
import ClocksList from "./components/ClocksList";

type Props = {};

class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <div className="ClocksList">
                    <ClocksList/>
                </div>
                <div className="Session">
                    <Timer/>
                    <TimeTicker/>
                    <ButtonsPanel/>
                </div>
            </div>
        );
    }
}

export default App;
