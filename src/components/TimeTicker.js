// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";

import type {State} from "../redux/state";
import {tickTime} from "../redux/actions";

type Props = {
    +isCounting: boolean,
    +onTimeTick: (lapse: number) => void,
}

export const mapStateToProps = (state: State) => ({isCounting: state.isCounting});
export const mapDispatchToProps = (dispatch: Function) => ({
    onTimeTick(lapse: number) {
        dispatch(tickTime(lapse));
    }
});


export class TimeTickerComponent extends Component<Props> {
    getIntervalId: () => number;

    componentDidMount() {
        const interval = this.props.interval;
        const intervalId = setInterval(this.props.onTimeTick.bind(this, interval), interval);

        this.getIntervalId = () => intervalId;
    }

    // Untested
    componentWillUnmount() {

    }

    render() {
        return (<div/>);
    }
}

// Untested
export default connect(mapStateToProps, mapDispatchToProps)(TimeTickerComponent);