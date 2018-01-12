// @flow
import React from "react";
import {connect} from "react-redux";
import {startCounting} from "../redux/actions";

type Props = {
    +onStartClick: Function
}

export const mapDispatchToProps = (dispatch: Function): Props => ({
    onStartClick(): void {
        dispatch(startCounting());
    }
});
export const StartButtonComponent = (props: Props): React$Element<any> => (
    <div>
        {/*<button id="btn_start" onClick={props.onStartClick}/>*/}
        <div className="buttons-panel-buttons" id="btn_start" onClick={props.onStartClick}/>
    </div>
);

// Untested
export default connect(null, mapDispatchToProps)(StartButtonComponent);
