// @flow
import React from "react";
import moment from "moment";
import {connect} from "react-redux";
import type {Session, State} from "../redux/state";

type Props = {
    time: number
}

export const mapStateToProps = (state: State): Session => state.session;
export const TimeTickerComponent = (props: Props): React$Element<any> => (
    <div id="clock-time" className="TimeTicker">{formatTime(props.time)}</div>
);

// Untested
export default connect(mapStateToProps)(TimeTickerComponent);

TimeTickerComponent.defaultProps = {
    displayName: 'TimeTicker'
};

function formatTime(time: number): string {
    return moment(time).format(`mm[m] ss[s] SSS`);
}