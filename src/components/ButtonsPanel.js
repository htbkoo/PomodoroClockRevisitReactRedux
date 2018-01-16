// @flow
import React from "react";
import type {State} from "../redux/state";
import {connect} from "react-redux";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";
import StopButton from "./StopButton";

type Props = {
    +isCounting: boolean
}

export const mapStateToProps = (state: State): Props => ({isCounting: state.session.isCounting});
export const ButtonsPanelComponent = (props: Props): React$Element<any> => {
    let startOrPauseButton = props.isCounting ? <PauseButton/> : <StartButton/>;
    return (
        <div id="buttons-panel">
            {startOrPauseButton}
            <StopButton/>
        </div>
    )
};

// Untested
export default connect(mapStateToProps)(ButtonsPanelComponent);
