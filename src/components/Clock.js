// @flow
import React from "react";
import {Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

import type {Clock} from "../redux/state";
import {NO_OP} from "../utils/functionUtil";
import type {onClockConfigUpdateType} from "./ClocksList";
import {reduxForm, Field, FieldArray} from "redux-form";

type Props = $ReadOnly<{
    +clock: Clock,
    +isCurrent: boolean,
    +onClockConfigUpdate: onClockConfigUpdateType
}>

const renderHobbies = ({fields, meta: {error}}) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push()}>
                Add Hobby
            </button>
        </li>
        {fields.map((hobby, index) => (
            <li key={index}>
                <button
                    type="button"
                    title="Remove Hobby"
                    onClick={() => fields.remove(index)}
                />
                <Field
                    name={hobby}
                    type="text"
                    component={renderField}
                    label={`Hobby #${index + 1}`}
                />
            </li>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
)

const renderMembers = ({fields, meta: {error, submitFailed}}) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>
                Add Member
            </button>
            {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((member, index) => (
            <li key={index}>
                <button
                    type="button"
                    title="Remove Member"
                    onClick={() => fields.remove(index)}
                />
                <h4>Member #{index + 1}</h4>
                <Field
                    name={`${member}.firstName`}
                    type="text"
                    component={renderField}
                    label="First Name"
                />
                <Field
                    name={`${member}.lastName`}
                    type="text"
                    component={renderField}
                    label="Last Name"
                />
                <FieldArray name={`${member}.hobbies`} component={renderHobbies}/>
            </li>
        ))}
    </ul>
)

const FieldArraysForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="clubName"
                type="text"
                component={renderField}
                label="Club Name"
            />
            <FieldArray name="members" component={renderMembers}/>
            <div>
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
}

export const ClockComponent = (props: Props): React$Element<any> => {
    let {fields, meta: {error, submitFailed}} = props;

    return (
        <div>
            {
                [
                    {key: "name", labelSize: 1, controlSize: 10},
                    {key: "duration", label: "Duration:", labelSize: 3, controlSize: 9},
                    {key: "colour", label: "Colour:", labelSize: 3, controlSize: 9}
                ].map((controlProps, index) => (
                        <Field props={props}
                               controlProps={controlProps}
                               key={index}
                               name={`byId[${index}]`}
                               component={ClockControlComponent}/>
                    )
                )
            }
        </div>
    );
};

type ClockControlComponentProps = {
    +controlProps: { key: string, label?: string, labelSize: number, controlSize: number },
    +clock: Clock,
    +onClockConfigUpdate: onClockConfigUpdateType
};

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

export const ClockControlComponent = (props: ClockControlComponentProps): React$Element<any> => {
    let {input, clock, controlProps, meta: {touched, error}} = props;
    let {key, label, labelSize, controlSize} = controlProps;

    let capitalizedKey = key.substring(0, 1).toUpperCase().concat(key.substring(1));
    // return (
    //     <div>
    //         <label>{label}</label>
    //         <div>
    //             <input {...input} type="text" placeholder={label}/>
    //             {touched && error && <span>{error}</span>}
    //         </div>
    //     </div>
    // );
    return (
        <FormGroup controlId={`formHorizontal${capitalizedKey}`} className={`clocks-list-clock-${key}`}>
            <Col componentClass={ControlLabel} sm={labelSize}>{label}</Col>
            <Col sm={controlSize}>
                <FormControl
                    {...input}
                    type="text"
                    // value={props.clock[key]}
                    placeholder={capitalizedKey}
                />
            </Col>
        </FormGroup>
    );
};
export const BackupClockControlComponent = (props: ClockControlComponentProps): React$Element<any> => {
    let {input, controlProps, meta: {touched, error}} = props;
    let {key, label, labelSize, controlSize} = controlProps;

    let capitalizedKey = key.substring(0, 1).toUpperCase().concat(key.substring(1));
    return (
        <FormGroup controlId={`formHorizontal${capitalizedKey}`} className={`clocks-list-clock-${key}`}>
            <Col componentClass={ControlLabel} sm={labelSize}>{label}</Col>
            <Col sm={controlSize}>
                <FormControl
                    type="text"
                    value={props.clock[key]}
                    placeholder={capitalizedKey}
                    onChange={NO_OP}
                />
            </Col>
        </FormGroup>
    );
};

// export const ClockWrapperFormComponent = ({isCurrent, pristine, reset, submitting}: Props): React$Element<any> => {
export const ClockWrapperFormComponent = (props: Props): React$Element<any> => {
    let {fields, meta: {error, submitFailed}} = props;
    console.log(`ClockWrapperFormComponent.props.fields: ${JSON.stringify(fields)}`);

    let array = fields.map((clock, index) => (
        <FieldArray name={`clock[${clock.id}]`} component={ClockComponent} props={props} key={index}/>
    ));

    return (
        <div className={getDivWrapperClasses().join(" ")}>
            {array}
        </div>
    );

    function getDivWrapperClasses() {
        let array = ["Clock"];
        if (props.isCurrent) {
            array.push("Clock-current");
        }
        return array;
    }
};

// export default reduxForm({
//     form: 'clocksForm', // a unique identifier for this form
// })(ClockWrapperFormComponent);

export default ClockWrapperFormComponent;