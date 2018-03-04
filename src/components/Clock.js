// @flow
import React from "react";
import {Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

import type {Clock} from "../redux/state";
import {NO_OP} from "../utils/functionUtil";
import type {onClockConfigUpdateType} from "./ClocksList";

type Props = $ReadOnly<{
    +clock: Clock,
    +isCurrent: boolean,
    +onClockConfigUpdate: onClockConfigUpdateType
}>

export const ClockComponent = (props: Props): React$Element<any> => {
    let formGroups = [
        {key: "name", labelSize: 1, controlSize: 10},
        {key: "duration", label: "Duration:", labelSize: 3, controlSize: 9},
        {key: "colour", label: "Colour:", labelSize: 3, controlSize: 9}
    ].map((controlProps, index) => (
            <ClockControlComponent controlProps={controlProps} clock={props.clock}
                                   onClockConfigUpdate={props.onClockConfigUpdate}
                                   key={index}/>
        )
    );

    return (
        <div className={getDivWrapperClasses().join(" ")}>
            <Form horizontal>
                {formGroups}
            </Form>
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

export default ClockComponent;
