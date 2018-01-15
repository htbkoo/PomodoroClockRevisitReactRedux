// @flow
import React from "react";
import {connect} from "react-redux";
import type {Action, Dispatch} from "../../redux/actions";

type Props = {
    buttonId: string,
    dispatch: Dispatch,
    action: Action
}

export const SimpleButtonComponent = (props: Props): React$Element<any> => (
    <div className="buttons-panel-buttons" id={props.buttonId} onClick={props.dispatch.bind(this, props.action)}/>
);

// Untested
export default connect()(SimpleButtonComponent);