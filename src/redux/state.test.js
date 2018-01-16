// @flow

import type {State} from "./state";
import {StateBuilder} from "./state";

describe('state', function () {
    describe("StateBuilder", function () {
        [
            {
                testName: "default for builder",
                expectedState: {
                    interval: 0,
                    isCounting: false,
                    session: {
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder()
            },
            {
                testName: "withTime",
                expectedState: {
                    interval: 0,
                    isCounting: false,
                    session: {
                        time: 1000,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder().withTime(1000)
            },
            {
                testName: "withIsCounting",
                expectedState: {
                    interval: 0,
                    isCounting: true,
                    session: {
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder().withIsCounting(true)
            },
            {
                testName: "withInterval",
                expectedState: {
                    interval: 100,
                    isCounting: false,
                    session: {
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder().withInterval(100)
            },
            {
                testName: "withOriginalTime",
                expectedState: {
                    interval: 0,
                    isCounting: false,
                    session: {
                        time: 0,
                        originalTime: 100,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder().withOriginalTime(100)
            }
        ].forEach(({testName, expectedState, stateBuilder}: { testName: string, expectedState: State, stateBuilder: StateBuilder }) =>
            it(`should be able to build state - testing ${testName}`, function () {
                //    given
                //    when
                let state: State = stateBuilder.build();

                //    then
                expect(state).toEqual(expectedState);
            })
        );
    });
});