// @flow
import React from "react";
import type {State} from "../redux/state";
import {connect} from "react-redux";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";
import StopButton from "./StopButton";
import {isDefinedAndNotNull} from "../utils/objectUtil";

type Props = {
    +isCounting: boolean,
    +originalTime: number
}

export const mapStateToProps = (state: State): Props => {
    let sessionClockId = state.session.clockId;
    let sessionClock = state.clocks.byId[sessionClockId];
    let originalTime = isDefinedAndNotNull(sessionClock) ? sessionClock.duration : 0;
    return {
        isCounting: state.session.isCounting,
        originalTime
    };
};

export const ButtonsPanelComponent = (props: Props): React$Element<any> => {
    let startOrPauseButton = props.isCounting ? <PauseButton/> : <StartButton/>;
    return (
        <div id="buttons-panel">
            {startOrPauseButton}
            <StopButton originalTime={props.originalTime}/>
        </div>
    )
};

// Untested
export default connect(mapStateToProps)(ButtonsPanelComponent);
