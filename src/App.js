// @flow
import React, {Component} from 'react';
import './App.css';
import Timer from "./components/Timer";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";
import ClocksList from "./components/ClocksList";
import type {State} from "./redux/state";

type Props = { +isCounting: boolean };

export const mapStateToProps = (state: State): Props => ({isCounting: state.session.isCounting});

class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <div className="container-clocksList">
                    <ClocksList/>
                </div>
                <div className="container-session">
                    <Timer/>
                    <TimeTicker/>
                    <ButtonsPanel/>
                </div>
            </div>
        );
    }
}

export default App;
