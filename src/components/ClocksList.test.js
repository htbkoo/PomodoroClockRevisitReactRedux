// @flow

import React from "react";
import {shallow} from "enzyme";

import {ClocksListComponent, mapDispatchToProps, mapStateToProps} from "./ClocksList";
import type {Clocks} from "../redux/state";
import {mockClock, StateBuilder} from "../testUtils/StateBuilder";

import Clock from "./Clock";
import {updateClockConfig} from "../redux/actions";
import {NO_OP} from "../utils/functionUtil";

describe('ClocksList', function () {
    const mockClock1 = mockClock("clock1"), mockClock2 = mockClock("clock2");

    describe("mapStateToProps", function () {
        it("should mapStateToProps", function () {
            //    given
            const currentClockId = "0";
            const state = {
                interval: 0,
                session: {
                    isCounting: true,
                    time: 0,
                    originalTime: 0,
                    clockId: currentClockId
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
                },
                currentClockId
            };
            expect(props).toEqual(expectedProps);
        });
    });

    describe("mapDispatchToProps", function () {
        it("should mapDispatchToProps", function () {
            //    given
            const spyDispatch = jest.fn();
            const id = "1", updatedConfig = {duration: 10};

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onClockConfigUpdate(id, updatedConfig);

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(updateClockConfig(id, updatedConfig));
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
                let clocksList = shallow(<ClocksListComponent clocks={clocks}
                                                              currentClockId="any"
                                                              onClockConfigUpdate={NO_OP}/>);

                //    then
                let clockComponents = clocksList.find(Clock);
                expect(clockComponents.length).toEqual(expectedClocksPropsPassed.length);
                expectedClocksPropsPassed.forEach((clock, index) =>
                    expect(clockComponents.at(index)).toHaveProp("clock", clock)
                );
            })
        );

        it(`should pass props.isCurrent=true for current clock (and false otherwise) to <Clock/>`, function () {
            //    given
            const currentClock = mockClock1;
            const clocksList = shallow(<ClocksListComponent clocks={clocks(currentClock, mockClock2)}
                                                            currentClockId={currentClock.id}
                                                            onClockConfigUpdate={NO_OP}/>);

            //    then
            let clockComponents = clocksList.find(Clock);
            clockComponents.forEach(
                clockComponent => {
                    if (clockComponent.prop("clock").id === currentClock.id) {
                        expect(clockComponent).toHaveProp("isCurrent", true);
                    } else {
                        expect(clockComponent).toHaveProp("isCurrent", false);
                    }
                }
            )
        });

        it(`should pass props.onClockConfigUpdate to <Clock/>`, function () {
            //    given
            const someClocks = clocks(mockClock1), someId = "id";
            const mockFn = jest.fn();
            const clocksList = shallow(<ClocksListComponent clocks={someClocks}
                                                            currentClockId={someId}
                                                            onClockConfigUpdate={mockFn}/>);

            //    when
            let clockComponent = clocksList.find(Clock);
            let actualFn = clockComponent.prop("onClockConfigUpdate");
            actualFn();

            //    then
            expect(mockFn).toHaveBeenCalledTimes(1);
        });
    });

    function clocks(...mockClocks) {
        return StateBuilder.builderWithClocks(mockClocks).build().clocks;
    }
});