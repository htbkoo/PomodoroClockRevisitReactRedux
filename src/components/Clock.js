// @flow
import React from "react";
import moment from "moment";

type Props = {
    time: number
}

export default function Clock(props: Props): string {
    return formatTime(props.time);
}

Clock.defaultProps = {
    displayName: 'Clock'
};

function formatTime(time: number): string {
    return moment(time).format(`mm[m] ss[s] SSS`);
}