// @flow
import React from "react";
import {connect} from "react-redux";
import {startCounting} from "../redux/actions";

export const mapDispatchToProps = (dispatch: Function) => ({
    onStartClick(): void {
        dispatch(startCounting());
    }
});
export const StartButtonComponent = (): React$Element<any> => (
    <div id="btn_start">

    </div>
);

// Untested
export default connect(null, mapDispatchToProps)(StartButtonComponent);
