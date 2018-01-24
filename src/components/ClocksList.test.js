// @flow

import React from "react";
import {shallow} from "enzyme";

import {ClocksListComponent, mapStateToProps} from "./ClocksList";
import type {Clock as ClockState, Clocks} from "../redux/state";

import Clock from "./Clock";

describe('ClocksList', function () {
    describe("ClocksListComponent", function () {
        it("should have a List of <Clock/> according to state.clocks", function () {
            //    given
            const clocksProps: Clocks = [dummyClock("Clock1"), dummyClock("Clock2")];

            //    when
            let clocksList = shallow(<ClocksListComponent clocks={clocksProps}/>);

            //    then
            let clocks = clocksList.find(Clock);
            expect(clocks.length).toEqual(clocksProps.length);
            clocksProps.forEach((clock, index) =>
                expect(clocks.at(index)).toHaveProp("clock", clock)
            );
        });
    });

    //$FlowFixMe
    function dummyClock(description): ClockState {
        // return Symbol(description);
        return description;
    }
});