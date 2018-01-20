// @flow

import React from "react";
import {shallow} from "enzyme";

import PauseButton from "./PauseButton";
import {pauseCounting} from "../redux/actions";
import SimpleButton from "./highOrderComponents/SimpleButton";

describe('PauseButton', function () {
    describe('PauseButton', function () {
        it('should be a <Simplebutton/> with action={pauseCounting()} buttonId="btn_pause"', function () {
            //    given
            const expectedProps = {action: pauseCounting(), buttonId: "btn_pause"};

            //    when
            let pauseButton = shallow(<PauseButton/>);

            //    then
            let button = pauseButton.find(SimpleButton);
            expect(button).toHaveProp("action", expectedProps.action);
            expect(button).toHaveProp("buttonId", expectedProps.buttonId);
        });
    });
});