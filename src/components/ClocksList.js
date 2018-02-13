// @flow
import React from "react";
import {connect} from "react-redux";

import type {ClockId, Clocks, State} from "../redux/state";

import Clock from "./Clock";

type StateProps = {
    +clocks: Clocks,
    +currentClockId: ClockId
};

type Props = StateProps;

export const mapStateToProps = (state: State): StateProps => ({clocks: state.clocks, currentClockId: state.session.clockId});

export const ClocksListComponent = (props: Props): React$Element<any> => {
    let clocks = props.clocks.allIds.map((id: ClockId) => <Clock key={id} clock={props.clocks.byId[id]} isCurrent={false}/>);
    return (
        <div id="clocks-list" className="ClocksList">{clocks}</div>
    )
};

// Untested
export default connect(mapStateToProps)(ClocksListComponent);
