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
export const ClockComponent = (props: Props): React$Element<any> => (
    <div className="Clock">
        <Form horizontal>
            <FormGroup controlId="formHorizontalName" className="clocks-list-clock-name">
                <Col componentClass={ControlLabel} sm={1}/>
                <Col sm={10}>
                    <FormControl
                        type="text"
                        value={props.clock.name}
                        placeholder="Name"
                        onChange={NO_OP()}
                    />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDuration" className="clocks-list-clock-duration">
                <Col componentClass={ControlLabel} sm={3}>
                    Duration
                </Col>
                <Col sm={9}>
                    <FormControl
                        type="text"
                        value={props.clock.duration}
                        placeholder="Duration"
                        onChange={NO_OP()}
                    />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDuration" className="clocks-list-clock-colour">
                <Col componentClass={ControlLabel} sm={3}>
                    Colour
                </Col>
                <Col sm={9}>
                    <FormControl
                        type="text"
                        value={props.clock.colour}
                        placeholder="Duration"
                        onChange={NO_OP()}
                    />
                </Col>
            </FormGroup>
        </Form>
    </div>
);

// Untested
export default connect()(ClockComponent);

// Untested
ClockComponent.defaultProps = {
    displayName: 'Clock'
};
