// @flow
import React from "react";
import {connect} from "react-redux";
import type {Clock} from "../redux/state";

// export const mapDispatchToProps = (state: State): DispatchProps => ({});
export const ClockComponent = (): React$Element<any> => (
    <div id="clocks-list" className="Clock">{clocks}</div>
);

// Untested
export default connect()(ClockComponent);

// Untested
ClockComponent.defaultProps = {
    displayName: 'Clock'
};
