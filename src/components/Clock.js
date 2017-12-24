// @flow
import React from "react";

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
    let ms = time % 1000, s = time / 1000;
    return `00m 0${s}s 00${ms}`;
}