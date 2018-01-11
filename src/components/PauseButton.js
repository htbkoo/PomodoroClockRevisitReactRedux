// @flow
import React from "react";
import {connect} from "react-redux";

type Props = {
}

export const mapDispatchToProps = (dispatch: Function) => ({
    onPauseClick() {
        dispatch(pauseCounting());
    }
});

export const PauseButtonComponent = (props: Props): React$Element<any> => (
    <div id="btn_pause">

    </div>
);

// Untested
export default connect(null, mapDispatchToProps)(PauseButtonComponent);