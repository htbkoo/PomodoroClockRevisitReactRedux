// @flow
import React from "react";
import type {State} from "../redux/state";
import {connect} from "react-redux";

type Props = {
}

export const mapStateToProps = (state: State): Props => ({});
export const StartButtonComponent = (props: Props): React$Element<any> => (
    <div id="btn_start">

    </div>
);

// Untested
export default connect(mapStateToProps)(StartButtonComponent);
