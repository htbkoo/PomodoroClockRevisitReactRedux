// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";

import type {State} from "../redux/state";
import {tickTime} from "../redux/actions";

type Props = {
    +isCounting: boolean,
    +interval: number,
    +onTimeTick: (lapse: number) => void,
}

export const mapStateToProps = (state: State) => ({isCounting: state.isCounting, interval: state.interval});
export const mapDispatchToProps = (dispatch: Function) => ({
    onTimeTick(lapse: number) {
        dispatch(tickTime(lapse));
    }
});


export class TimeTickerComponent extends Component<Props> {
    getIntervalId: () => number;

    componentDidMount() {
        const interval = this.props.interval;
        // TODO: improve performance?
        const intervalId = setInterval(() => {
            if (this.props.isCounting) {
                this.props.onTimeTick(interval)
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