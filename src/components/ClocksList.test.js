// @flow

import React from "react";
import {shallow} from "enzyme";

import {ClocksListComponent, mapStateToProps} from "./ClocksList";
import type {Clock as ClockState, Clocks} from "../redux/state";

import Clock from "./Clock";
import {StateBuilder} from "../redux/state";

describe('ClocksList', function () {
    const mockClock1 = mockClock("clock1"), mockClock2 = mockClock("clock2");

    describe("mapStateToProps", function () {
        it("should mapStateToProps", function () {
            //    given
            const clocks: Clocks = new StateBuilder().addClock(mockClock1).addClock(mockClock2).build().clocks;
            const state = {
                interval: 0,
                session: {
                    isCounting: true,
                    time: 0,
                    originalTime: 0,
                    clockId: 0
                },
                clocks: {
                    byId: {
                        "clock1": mockClock1,
                        "clock2": mockClock2
                    },
                    allIds: ["clock1", "clock2"]
                }
            };

            //    when
            let props = mapStateToProps(state);

            //    then
            expect(props).toEqual({clocks});
        });
    });

    describe("ClocksListComponent", function () {
        [
            {
                testName: "should have a List of <Clock/> according to state.clocks",
                clocks: new StateBuilder().addClock(mockClock1).addClock(mockClock2).build().clocks,
                expectedClocksPropsPassed: [mockClock1, mockClock2],
            },
            {
                testName: "should render List of <Clock/> in the same order in state.clocks",
                clocks: new StateBuilder().addClock(mockClock2).addClock(mockClock1).build().clocks,
                expectedClocksPropsPassed: [mockClock2, mockClock1],
            }
        ].forEach(({testName, clocks, expectedClocksPropsPassed})=>
            it(testName, function () {
                //    when
                let clocksList = shallow(<ClocksListComponent clocks={clocks}/>);

                //    then
                let clockComponents = clocksList.find(Clock);
                expect(clockComponents.length).toEqual(expectedClocksPropsPassed.length);
                expectedClocksPropsPassed.forEach((clock, index) =>
                    expect(clockComponents.at(index)).toHaveProp("clock", clock)
                );
            })
        );
    });

    // Simple mock clock so need to fake the flow type
    //$FlowFixMe
    function mockClock(id): ClockState {
        return {id: id,};
    }
});