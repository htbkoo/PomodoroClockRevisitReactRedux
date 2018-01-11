// @flow
import React from "react";
import {connect} from "react-redux";
import {pauseCounting} from "../redux/actions";

type Props = {
    onPauseClick: () => void
}

export const mapDispatchToProps = (dispatch: Function): Props => ({
    onPauseClick() {
        dispatch(pauseCounting());
    }
});

export const PauseButtonComponent = (props: Props): React$Element<any> => (
    <div id="btn_pause" onClick={props.onPauseClick}/>
);

// Untested
export default connect(null, mapDispatchToProps)(PauseButtonComponent);