// @flow

import React from "react";
import {shallow} from "enzyme";

import {ClocksListComponent, mapStateToProps} from "./ClocksList";
import type {Clocks} from "../redux/state";
import {StateBuilder, mockClock} from "../testUtils/StateBuilder";

import Clock from "./Clock";

describe('ClocksList', function () {
    const mockClock1 = mockClock("clock1"), mockClock2 = mockClock("clock2");

    describe("mapStateToProps", function () {
        it("should mapStateToProps", function () {
            //    given
            const state = {
                interval: 0,
                session: {
                    isCounting: true,
                    time: 0,
                    originalTime: 0,
                    clockId: "0"
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
            const expectedProps: { +clocks: Clocks } = {
                clocks: {
                    byId: {
                        "clock1": mockClock1,
                        "clock2": mockClock2
                    },
                    allIds: ["clock1", "clock2"]
                }
            };
            expect(props).toEqual(expectedProps);
        });
    });

    describe("ClocksListComponent", function () {
        [
            {
                testName: "should have a List of <Clock/> according to state.clocks",
                clocks: clocks(mockClock1, mockClock2),
                expectedClocksPropsPassed: [mockClock1, mockClock2],
            },
            {
                testName: "should render List of <Clock/> in the same order in state.clocks",
                clocks: clocks(mockClock2, mockClock1),
                expectedClocksPropsPassed: [mockClock2, mockClock1],
            }
        ].forEach(({testName, clocks, expectedClocksPropsPassed}) =>
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

    function clocks(...mockClocks) {
        const startWithNewBuilder = new StateBuilder();
        return mockClocks.reduce((builder, mockClock) => builder.addClock(mockClock), startWithNewBuilder)
            .build()
            .clocks;
    }
});