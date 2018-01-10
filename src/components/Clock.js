// @flow
import React from "react";
import moment from "moment";
import {connect} from "react-redux";
import type {Session, State} from "../redux/state";

type Props = Session;

export const mapStateToProps = (state: State): Session => state.session;
export const ClockComponent = (props: Props): React$Element<any> => (
    <div id="clock-time" className="Clock">{formatTime(props.time)}</div>
);

// Untested
export default connect(mapStateToProps)(ClockComponent);

ClockComponent.defaultProps = {
    displayName: 'Clock'
};

function formatTime(time: number): string {
    return moment(time).format(`mm[m] ss[s] SSS`);
}