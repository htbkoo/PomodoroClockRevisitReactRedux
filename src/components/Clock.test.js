// @flow

import React from "react";
import {shallow} from "enzyme";
import {FormControl, Col} from "react-bootstrap";

import Clock, {ClockComponent, ClockControlComponent} from "./Clock";
import type {Clock as ClockState} from "../redux/state";
import {NO_OP} from "../utils/functionUtil";

describe('Clock', function () {
    describe("ClockComponent", function () {
        it("should display the props.name, props.duration and props.colour in <Clock/>", function () {
            //    given
            let clock = getShallowClockComponent();

            //    then
            let clockControlComponents = clock.find(ClockControlComponent);
            [
                "name",
                "duration",
                "colour",
            ].forEach((value, index) =>
                expect(clockControlComponents.at(index).prop("controlProps").key).toEqual(value)
            );
        });

        it("should have '.Clock-current' className in <div/> when props.isCurrent=true", function () {
            //    given
            let clock = getShallowClockComponent(true);

            //    then
            let divWrapperComponents = clock.find("div");
            expect(divWrapperComponents).toHaveClassName("Clock-current");
        });

        it("should not have '.Clock-current' className in <div/> when props.isCurrent=false", function () {
            //    given
            let clock = getShallowClockComponent(false);

            //    then
            let divWrapperComponents = clock.find("div");
            expect(divWrapperComponents).not.toHaveClassName("Clock-current");
        });

        function getShallowClockComponent(isCurrent = false) {
            const colour = "someColour", duration = 1000, name = "someName";
            const clockProps: ClockState = {
                colour,
                duration,
                name,
                id: "1"
            };

            return shallow(<ClockComponent clock={clockProps} isCurrent={isCurrent} onClockConfigUpdate={NO_OP}/>);
        }
    });

    describe("ClockControlComponent", function () {
        it("should display the pair of <col>label</col> and <col>input</col> in <ClockControlComponent/>", function () {
            //    given
            const colour = "someColour", duration = 1000, name = "someName";
            const props = {key: "name", labelSize: 1, controlSize: 10, label: "someLabel"};
            const clockProps: ClockState = {
                colour,
                duration,
                name,
                id: "1"
            };

            //    when
            let clock = shallow(<ClockControlComponent clock={clockProps} controlProps={props}/>);

            //    then
            let cols = clock.find(Col);
            expect(cols.at(0)).toHaveProp("children", props.label);
            expect(cols.find(FormControl)).toHaveProp("value", clockProps[props.key]);
        });
    });
});