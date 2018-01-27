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
        {key: "name", labelSize: 1, controlSize: 10}
    ].map(({key, label, labelSize, controlSize}: { key: string, label?: string, labelSize: number, controlSize: number }, index) => {
        let capitalizedKey = key.substring(0, 1).toUpperCase().concat(key.substring(1));
        return (
            <FormGroup controlId={`formHorizontal${capitalizedKey}`} className={`clocks-list-clock-${key}`} key={index}>
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
        )
    });

    return (
        <div className="Clock">
            <Form horizontal>
                {formGroups}
                <FormGroup controlId="formHorizontalDuration" className="clocks-list-clock-duration">
                    <Col componentClass={ControlLabel} sm={3}>
                        Duration
                    </Col>
                    <Col sm={9}>
                        <FormControl
                            type="text"
                            value={props.clock.duration}
                            placeholder="Duration"
                            onChange={NO_OP}
                        />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalColour" className="clocks-list-clock-colour">
                    <Col componentClass={ControlLabel} sm={3}>
                        Colour
                    </Col>
                    <Col sm={9}>
                        <FormControl
                            type="text"
                            value={props.clock.colour}
                            placeholder="Colour"
                            onChange={NO_OP}
                        />
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
};

// Untested
export default connect()(ClockComponent);

// Untested
ClockComponent.defaultProps = {
    displayName: 'Clock'
};
