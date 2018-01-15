// @flow

import React from "react";
import {shallow} from "enzyme";

import StartButton from "./StartButton";
import {startCounting} from "../redux/actions";
import SimpleButton from "./highOrderComponents/SimpleButton";

describe('StartButton', function () {
    describe('StartButton', function () {
        it('should be a <Simplebutton/> with action={pauseCounting()} buttonId="btn_pause"', function () {
            //    given
            const expectedProps = {action: startCounting(), buttonId: "btn_start"};

            //    when
            let startButton = shallow(<StartButton/>);

            //    then
            let button = startButton.find(SimpleButton);
            expect(button).toHaveProp("action", expectedProps.action);
            expect(button).toHaveProp("buttonId", expectedProps.buttonId);
        });
    });
});