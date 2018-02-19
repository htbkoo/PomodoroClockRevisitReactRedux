// @flow
import React from "react";
import moment from "moment";
import {connect} from "react-redux";
import type {State} from "../redux/state";
import CircularProgressbar from "react-circular-progressbar";

import 'react-circular-progressbar/dist/styles.css';

type Props = {
    +time: number,
    +percentage: number
};

export const mapStateToProps = (state: State): Props => ({time: state.session.time});
export const TimerComponent = (props: Props): React$Element<any> => (
    <div id="clock-time" className="Timer">
        <CircularProgressbar percentage={props.percentage} textForPercentage={() => formatTime(props.time)}/>
    </div>
);

export function formatTime(time: number): string {
    return moment(time).format(`mm[m] ss[s] SSS`);
}

// Untested
export default connect(mapStateToProps)(TimerComponent);