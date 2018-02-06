// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";

import type {Clock, State} from "../redux/state";
import {tickTime, timesUp} from "../redux/actions";
import clocksHelper from "./helpers/clocksHelper";
import {isDefinedAndNotNull} from "../utils/objectUtil";

type StateProps = {
    +isCounting: boolean,
    +interval: number,
    +time: number,
    +nextClock: Clock,
}

type DispatchProps = {
    +onTimeTick: (lapse: number) => void,
    +onTimesUp: (nextClock: Clock) => void,
}

type Props = StateProps & DispatchProps;

export const mapStateToProps = (state: State): StateProps => ({
    isCounting: state.session.isCounting,
    interval: state.interval,
    time: state.session.time,
    nextClock: clocksHelper.getNextDuration(state.clocks, state.session.clockId)
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    onTimeTick(lapse: number) {
        dispatch(tickTime(lapse));
    },
    onTimesUp(nextClock: Clock) {
        dispatch(timesUp(nextClock));
    },
});

export class TimeTickerComponent extends Component<Props> {
    getIntervalId: () => number;

    componentDidMount() {
        const interval = this.props.interval;
        // TODO: improve performance?
        if (interval > 0) {
            const intervalId = setInterval(() => {
                if (this.props.isCounting) {
                    if (willTimeUp(this.props)) {
                        this.props.onTimesUp(this.props.nextClock);
                    } else {
                        this.props.onTimeTick(interval)
                    }
                }
            }, interval);

            // Untested
            this.getIntervalId = () => intervalId;
        }
    }

    // Untested
    componentWillUnmount() {
        if (isDefinedAndNotNull(this.getIntervalId)) {
            clearInterval(this.getIntervalId());
        }
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