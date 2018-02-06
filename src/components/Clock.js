// @flow
import React from "react";
import {connect} from "react-redux";
import {Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

import type {Clock} from "../redux/state";
import {NO_OP} from "../utils/functionUtil";

type Props = $ReadOnly<{
    +clock: Clock
}>

// export const mapDispatchToProps = (state: State): DispatchProps => ({});
export const ClockComponent = (props: Props): React$Element<any> => {
    let formGroups = [
        {key: "name", labelSize: 1, controlSize: 10},
        {key: "duration", label: "Duration:", labelSize: 3, controlSize: 9},
        {key: "colour", label: "Colour:", labelSize: 3, controlSize: 9}
    ].map((controlProps, index) => (
        <ClockControlComponent controlProps={controlProps} clock={props.clock} key={index}/>));

    return (
        <div className="Clock">
            <Form horizontal>
                {formGroups}
            </Form>
        </div>
    )
};

export const ClockControlComponent = (props: { +controlProps: { key: string, label?: string, labelSize: number, controlSize: number }, +clock: Clock }): React$Element<any> => {
    let {key, label, labelSize, controlSize} = props.controlProps;

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

// Untested
export default connect()(ClockComponent);

// Untested
ClockComponent.defaultProps = {
    displayName: 'Clock'
};
