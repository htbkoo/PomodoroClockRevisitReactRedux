// @flow
import React from "react";
import {connect} from "react-redux";
import {FieldArray, reduxForm} from "redux-form";

import type {ClockConfig, ClockId, Clocks, State} from "../redux/state";

import Clock, {ClockComponent} from "./Clock";
import {updateClockConfig} from "../redux/actions";

export type onClockConfigUpdateType = (id: ClockId, updatedConfig: ClockConfig) => void

type StateProps = {
    +currentClockId: ClockId,
    +initialValues: {
        +clocks: any
    }
};

type DispatchProps = {
    +onClockConfigUpdate: onClockConfigUpdateType
};

type Props = StateProps & DispatchProps;

export const mapStateToProps = (state: State): StateProps => ({
    currentClockId: state.session.clockId,
    initialValues: {
        clocks: state.clocks.allIds.map(id => state.clocks.byId[id])
    }
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    onClockConfigUpdate: (id, updatedConfig) => {
        dispatch(updateClockConfig(id, updatedConfig));
    }
});

// export const ClockWrapperFormComponent = ({isCurrent, pristine, reset, submitting}: Props): React$Element<any> => {
export const ClocksListComponent = (props: Props): React$Element<any> => {
    let {fields, meta: {error, submitFailed}} = props;
    console.log(`ClockWrapperFormComponent.props.fields: ${JSON.stringify(fields)}`);

    let array = fields.map((clock, index) => (
        <FieldArray name={`clocks[${clock.id}].controls`} component={ClockComponent} props={props} key={index}/>
    ));

    return (
        <div className={getDivWrapperClasses().join(" ")}>
            {array}
        </div>
    );

    function getDivWrapperClasses() {
        let array = ["Clock"];
        let isCurrent = false;
        if (isCurrent) {
            array.push("Clock-current");
        }
        return array;
    }
};

export let ClocksListWrapperComponent = (props: Props): React$Element<any> => {
    return (
        <FieldArray name="clocks" component={ClocksListComponent}
                    currentClockId={props.currentClockId}
                    onClockConfigUpdate={props.onClockConfigUpdate}/>
    );
};

// Untested

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps, mapDispatchToProps)
(reduxForm({ // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
    form: 'clocksForm', // a unique identifier for this form
})(ClocksListWrapperComponent))
