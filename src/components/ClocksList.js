// @flow
import React from "react";
import {connect} from "react-redux";
import {reduxForm, Field, FieldArray} from "redux-form";

import type {ClockConfig, ClockId, Clocks, State} from "../redux/state";

import Clock from "./Clock";
import {updateClockConfig} from "../redux/actions";

export type onClockConfigUpdateType = (id: ClockId, updatedConfig: ClockConfig) => void

type StateProps = {
    +currentClockId: ClockId,
    +initialValues: {
        +clocks: Clocks
    }
};

type DispatchProps = {
    +onClockConfigUpdate: onClockConfigUpdateType
};

type Props = StateProps & DispatchProps;

export const mapStateToProps = (state: State): StateProps => ({
    currentClockId: state.session.clockId,
    initialValues: {
        clocks: state.clocks
    }
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    onClockConfigUpdate: (id, updatedConfig) => {
        dispatch(updateClockConfig(id, updatedConfig));
    }
});

export let ClocksListComponent = (props: Props): React$Element<any> => {
    return (
        <FieldArray name="clocks" component={Clock}
                    currentClockId={props.currentClockId}
                    onClockConfigUpdate={props.onClockConfigUpdate}/>
    );
};

export let BackupClocksListComponent = (props: Props): React$Element<any> => {
    let clocks = props.clocks.allIds.map((id: ClockId) =>
        <Clock key={id}
               clock={props.clocks.byId[id]}
               isCurrent={props.currentClockId === id}
               onClockConfigUpdate={props.onClockConfigUpdate}/>);
    return (
        <div id="clocks-list" className="ClocksList">{clocks}</div>
    )
};

// Untested

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps, mapDispatchToProps)
(reduxForm({ // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
    form: 'clocksForm', // a unique identifier for this form
})(ClocksListComponent))

/*
export default connect(
    state => ({
        initialValues: state.clocks.allIds.map(id => state.clocks.byId[id]) // pull initial values from account reducer
    }),
    {}
)(reduxForm({ // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
    form: 'clocksForm', // a unique identifier for this form
})(ClocksListComponent))
*/
