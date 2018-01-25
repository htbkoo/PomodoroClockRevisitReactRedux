// @flow

import React from "react";
import {shallow} from "enzyme";

import Clock, {ClockComponent} from "./Clock";
import type {Clock as ClockState} from "../redux/state";

describe('Clock', function () {
    describe("ClockComponent", function () {
        it("should display the props.name, props.duration and props.colour in <Clock/>", function () {
            //    given
            const colour = "someColour", duration = 1000, name = "someName";
            const clockProps: ClockState = {
                colour,
                duration,
                name,
                id: "1"
            };

            //    when
            let clock = shallow(<ClockComponent clock={clockProps}/>);

            //    then
            expect(clock).toIncludeText(colour);
            expect(clock).toIncludeText(duration.toString());
            expect(clock).toIncludeText(name);
        });
    });
});