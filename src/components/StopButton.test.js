// @flow

import React from "react";
import {shallow} from "enzyme";

import StopButton from "./StopButton";
import {stopCounting} from "../redux/actions";
import SimpleButton from "./highOrderComponents/SimpleButton";

describe('StopButton', function () {
    describe('StopButton', function () {
        it('should be a <Simplebutton/> with action={stopCounting()} buttonId="btn_stop"', function () {
            //    given
            const expectedProps = {action: stopCounting(), buttonId: "btn_stop"};

            //    when
            let startButton = shallow(<StopButton/>);

            //    then
            let button = startButton.find(SimpleButton);
            expect(button).toHaveProp("action", expectedProps.action);
            expect(button).toHaveProp("buttonId", expectedProps.buttonId);
        });
    });
});