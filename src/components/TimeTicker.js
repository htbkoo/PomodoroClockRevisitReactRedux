// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";

import type {State} from "../redux/state";
import {tickTime, timesUp} from "../redux/actions";

type StateProps = {
    +isCounting: boolean,
    +interval: number,
    +time: number,
}

type DispatchProps = {
    +onTimeTick: (lapse: number) => void,
    +onTimesUp: (nextDuration: number) => void,
}

type Props = StateProps & DispatchProps;

export const mapStateToProps = (state: State): StateProps => ({
    isCounting: state.session.isCounting,
    interval: state.interval,
    time: state.session.time
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    onTimeTick(lapse: number) {
        dispatch(tickTime(lapse));
    },
    onTimesUp(nextDuration: number) {
        dispatch(timesUp(nextDuration));
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
                        this.props.onTimesUp();
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
        if (typeof this.getIntervalId !== "undefined") {
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