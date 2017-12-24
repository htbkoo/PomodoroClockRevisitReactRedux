// @flow
import React from "react";

type Props = {
}

export default function Clock(props: Props): string {
    return "00m 01s 000";
}

Clock.defaultProps = {
    displayName: 'Clock'
};