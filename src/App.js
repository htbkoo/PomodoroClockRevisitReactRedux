// @flow
import React, {Component} from 'react';
import './stylesheets/App.css';
import Timer from "./components/Timer";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";
import ClocksList from "./components/ClocksList";
import type {State} from "./redux/state";
import {connect} from "react-redux";

type Props = { +isCounting: boolean };

export const mapStateToProps = (state: State): Props => ({isCounting: state.session.isCounting});

export class AppComponent extends Component<Props> {
    render() {
        let optionalTimeTicker = this.props.isCounting ? <TimeTicker/> : "";

        return (
            <div className="App">
                <div className="container-clocksList">
                    <ClocksList/>
                </div>
                <div className="container-session">
                    <Timer/>
                    {optionalTimeTicker}
                    <ButtonsPanel/>
                </div>
            </div>
        );
    }
}

// Untested
export default connect(mapStateToProps)(AppComponent);
