// @flow
import React from "react";
import type {State} from "../redux/state";
import {connect} from "react-redux";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";

type Props = {
    +isCounting: boolean
}

export const mapStateToProps = (state: State): Props => ({isCounting: state.isCounting});
export const ButtonsPanelComponent = (props: Props): React$Element<any> => {
    let button = props.isCounting ? <PauseButton/> : <StartButton/>;
    return (
        <div id="buttons-panel">
            {button}
        </div>
    )
};

// Untested
export default connect(mapStateToProps)(ButtonsPanelComponent);
