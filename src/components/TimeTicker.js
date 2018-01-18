// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";

import type {State} from "../redux/state";
import {tickTime, timesUp} from "../redux/actions";

type Props = StateProps & DispatchProps;

type StateProps = {
    +isCounting: boolean,
    +interval: number,
    +time: number,
}

type DispatchProps = {
    +onTimeTick: (lapse: number) => void,
    +onTimesUp: () => void,
}

export const mapStateToProps = (state: State): StateProps => ({
    isCounting: state.session.isCounting,
    interval: state.interval,
    time: state.session.time
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    onTimeTick(lapse: number) {
        dispatch(tickTime(lapse));
    },
    onTimesUp() {
        dispatch(timesUp());
    },
});

export class TimeTickerComponent extends Component<Props> {
    getIntervalId: () => number;

    componentDidMount() {
        const interval = this.props.interval;
        // TODO: improve performance?
        const intervalId = setInterval(() => {
            if (this.props.isCounting) {
                if (willTimeUp(this.props)) {
                    this.props.onTimesUp();
                } else {
                    this.props.onTimeTick(interval)
                }
            }
        }, interval);

        // Untested
        this.getIntervalId = () => intervalId;
    }

    // Untested
    componentWillUnmount() {
        clearInterval(this.getIntervalId());
    }

    render() {
        return (<div/>);
    }
}

// Untested
export default connect(mapStateToProps, mapDispatchToProps)(TimeTickerComponent);

function willTimeUp(props: Props): boolean {
    return props.interval >= props.time;
}