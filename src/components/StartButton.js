// @flow
import React from "react";
import {connect} from "react-redux";

export const mapDispatchToProps = (dispatch: any) => ({
    onStartClick(): void {
        dispatch();
    }
});
export const StartButtonComponent = (): React$Element<any> => (
    <div id="btn_start">

    </div>
);

// Untested
export default connect(null, mapDispatchToProps)(StartButtonComponent);
