// @flow
import React from "react";
import Clock from "./Clock";

import type {Clock as ClockState, Clocks, State} from "../redux/state";

type StateProps = {
    +clocks: Clocks
};

type Props = StateProps;

export const mapStateToProps = (state: State): StateProps => ({clocks: state.clocks});

export const ClocksListComponent = (props: Props): React$Element<any> => {
    let clocks = props.clocks.map((clock: ClockState) => <Clock key={clock.id} clock={clock}/>);
    return (
        <div id="clocks-list" className="ClocksList">{clocks}</div>
    )
};

// Untested
ClocksListComponent.defaultProps = {
    displayName: 'ClocksList'
};