// @flow
import React from "react";
import moment from "moment";

type Props = {
    time: number
}

const Clock = (props: Props): React$Element<any> => (<div id="clock-time" className="Clock">{formatTime(props.time)}</div>);

export default Clock;

Clock.defaultProps = {
    displayName: 'Clock'
};

function formatTime(time: number): string {
    return moment(time).format(`mm[m] ss[s] SSS`);
}