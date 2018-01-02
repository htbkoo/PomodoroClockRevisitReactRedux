// @flow
import React from "react";
import type {State} from "../redux/state";
import {connect} from "react-redux";
import StartButton from "./StartButton";

type Props = {
    +isCounting: boolean
}

export const mapStateToProps = (state: State): Props => ({isCounting: state.isCounting});
export const ButtonsPanelComponent = (props: Props): React$Element<any> => (
    <div id="buttons-panel">
        <StartButton/>
    </div>
);

// Untested
export default connect(mapStateToProps)(ButtonsPanelComponent);
