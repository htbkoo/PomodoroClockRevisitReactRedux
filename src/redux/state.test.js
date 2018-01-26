// @flow

import type {Clock, State} from "./state";
import {newInitialStateBuilder, StateBuilder} from "./state";

describe('state', function () {
    describe("StateBuilder", function () {
        const dummyClock: Clock = mockClock("dummyClock"), dummyClock2: Clock = mockClock("dummyClock2");

        [
            {
                testName: "default for builder",
                expectedState: {
                    interval: 0,
                    session: {
                        isCounting: false,
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: {
                        byId: {},
                        allIds: []
                    }
                },
                stateBuilder: new StateBuilder()
            },
            {
                testName: "withTime",
                expectedState: {
                    interval: 0,
                    session: {
                        isCounting: false,
                        time: 1000,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: {
                        byId: {},
                        allIds: []
                    }
                },
                stateBuilder: new StateBuilder().withTime(1000)
            },
            {
                testName: "withIsCounting",
                expectedState: {
                    interval: 0,
                    session: {
                        isCounting: true,
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: {
                        byId: {},
                        allIds: []
                    }
                },
                stateBuilder: new StateBuilder().withIsCounting(true)
            },
            {
                testName: "withInterval",
                expectedState: {
                    interval: 100,
                    session: {
                        isCounting: false,
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: {
                        byId: {},
                        allIds: []
                    }
                },
                stateBuilder: new StateBuilder().withInterval(100)
            },
            {
                testName: "withOriginalTime",
                expectedState: {
                    interval: 0,
                    session: {
                        isCounting: false,
                        time: 0,
                        originalTime: 100,
                        clockId: 0
                    },
                    clocks: {
                        byId: {},
                        allIds: []
                    }
                },
                stateBuilder: new StateBuilder().withOriginalTime(100)
            },
            // addClock
            {
                testName: "addClock",
                expectedState: {
                    interval: 0,
                    session: {
                        isCounting: false,
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: {
                        byId: {
                            "dummyClock": dummyClock
                        },
                        allIds: ["dummyClock"]
                    }
                },
                stateBuilder: new StateBuilder().addClock(dummyClock)
            },
            {
                testName: "addClock twice for 2 clocks",
                expectedState: {
                    interval: 0,
                    session: {
                        isCounting: false,
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: {
                        byId: {
                            "dummyClock2": dummyClock2,
                            "dummyClock": dummyClock
                        },
                        allIds: ["dummyClock2", "dummyClock"]
                    }
                },
                stateBuilder: new StateBuilder().addClock(dummyClock2).addClock(dummyClock)
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

        // Simple mock clock so need to fake the flow type
        //$FlowFixMe
        function mockClock(id): Clock {
            return {id};
        }
    });

    describe('getInitialStateBuilder', function () {
        it('should expose getInitialStateBuilder as the supplier to the initialStateBuilder', function () {
            //    given
            const initialStateBuilder = newInitialStateBuilder();

            //    when
            let nextState: State = initialStateBuilder.build();

            //    then
            const expectedInitialState: State = {
                interval: 100,
                session: {
                    isCounting: false,
                    time: 1500000,
                    originalTime: 1500000,
                    clockId: 0
                },
                clocks: {
                    byId: {
                        "1": {
                            id: "1",
                            duration: 1500000,
                            name: "pomodoro",
                            colour: "red"
                        },
                        "2": {
                            id: "2",
                            duration: 300000,
                            name: "break",
                            colour: "green"
                        }
                    },
                    allIds: ["1", "2"]
                }
            };
            expect(nextState).toEqual(expectedInitialState);
        });
    });
});