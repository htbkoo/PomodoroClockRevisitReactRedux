// @flow

import React from "react";
import {shallow} from "enzyme";

import {ClocksListComponent, mapStateToProps} from "./ClocksList";
import type {Clock as ClockState, Clocks} from "../redux/state";

import Clock from "./Clock";
import {StateBuilder} from "../redux/state";

describe('ClocksList', function () {
    describe("mapStateToProps", function () {
        it("should mapStateToProps", function () {
            //    given
            const clocks: Clocks = [mockClock("Clock1"), mockClock("Clock2")];
            const state = clocks.reduce((builder: StateBuilder, clock: ClockState) => {
                builder.addClock(clock);
                return builder;
            }, new StateBuilder()).build();

            //    when
            let props = mapStateToProps(state);

            //    then
            expect(props).toEqual({clocks});
        });
    });
    
    describe("ClocksListComponent", function () {
        it("should have a List of <Clock/> according to state.clocks", function () {
            //    given
            const clocksProps: Clocks = [mockClock("Clock1"), mockClock("Clock2")];

            //    when
            let clocksList = shallow(<ClocksListComponent clocks={clocksProps}/>);

            //    then
            let clocks = clocksList.find(Clock);
            expect(clocks.length).toEqual(clocksProps.length);
            clocksProps.forEach((clock, index) =>
                expect(clocks.at(index)).toHaveProp("clock", clock)
            );
        });

        it("should render List of <Clock/> in the same order in state.clocks", function () {
            //    given
            const clocksProps: Clocks = [mockClock("Clock2"), mockClock("Clock1")];

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

    // Simple mock clock so need to fake the flow type
    //$FlowFixMe
    function mockClock(id): ClockState {
        return {id: id,};
    }
});