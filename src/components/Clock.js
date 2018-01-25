// @flow
import React from "react";
import {connect} from "react-redux";
import type {Clock} from "../redux/state";

type Props = $ReadOnly<{
    +clock: Clock
}>

// export const mapDispatchToProps = (state: State): DispatchProps => ({});
export const ClockComponent = (props: Props): React$Element<any> => (
    <div>
        <div className="clocks-list-clock-name">{props.clock.name}</div>
        <div className="clocks-list-clock-duration">{props.clock.duration}</div>
        <div className="clocks-list-clock-colour">{props.clock.colour}</div>
    </div>
);

// Untested
export default connect()(ClockComponent);

// Untested
ClockComponent.defaultProps = {
    displayName: 'Clock'
};
