// @flow
import React from "react";
import {connect} from "react-redux";

import type {ClockConfig, ClockId, Clocks, State} from "../redux/state";

import Clock from "./Clock";
import {updateClockConfig} from "../redux/actions";

export type onClockConfigUpdateType = (id: ClockId, updatedConfig: ClockConfig) => void

type StateProps = {
    +clocks: Clocks,
    +currentClockId: ClockId
};

type DispatchProps = {
    +onClockConfigUpdate: onClockConfigUpdateType
};

type Props = StateProps & DispatchProps;

export const mapStateToProps = (state: State): StateProps => ({
    clocks: state.clocks,
    currentClockId: state.session.clockId
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    onClockConfigUpdate: (id, updatedConfig) => {
        dispatch(updateClockConfig(id, updatedConfig));
    }
});

export const ClocksListComponent = (props: Props): React$Element<any> => {
    let clocks = props.clocks.allIds.map((id: ClockId) => <Clock key={id}
                                                                 clock={props.clocks.byId[id]}
                                                                 isCurrent={props.currentClockId === id}
                                                                 onClockConfigUpdate={props.onClockConfigUpdate}/>);
    return (
        <div id="clocks-list" className="ClocksList">{clocks}</div>
    )
};

// Untested
export default connect(mapStateToProps, mapDispatchToProps)(ClocksListComponent);
