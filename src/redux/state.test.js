// @flow

import type {State, WithClockId} from "./state";
import {newInitialStateBuilder, StateBuilder} from "./state";

describe('state', function () {
    describe("StateBuilder", function () {
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

        describe("addClock", function () {
            it("should be able to build state with 1 clock by addClock", function () {
                //    given
                const dummyClock: WithClockId = {id: "1"};

                //    when
                let state: State = new StateBuilder().addClock(dummyClock).build();

                //    then
                const expectedState = {
                    interval: 0,
                    session: {
                        isCounting: false,
                        time: 0,
                        originalTime: 0,
                        clockId: 0
                    },
                    clocks: {
                        byId: {
                            "1": dummyClock
                        },
                        allIds: ["1"]
                    }
                };
                expect(state).toEqual(expectedState);
            });

            it("should be able to build state with 2 clocks by addClock twice", function () {
                //    given
                const dummyClock: WithClockId = {id: "dummyClock"}, dummyClock2: WithClockId = {id: "dummyClock2"};

                //    when
                let state: State = new StateBuilder().addClock(dummyClock2).addClock(dummyClock).build();

                //    then
                const expectedState = {
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
                };
                expect(state).toEqual(expectedState);
            });
        });
    });

    describe('getInitialStateBuilder', function () {
        it('should expose getInitialStateBuilder as the supplier to the initialStateBuilder', function () {
            //    given
            const initialStateBuilder = newInitialStateBuilder();

            //    when
            let nextState: State = initialStateBuilder.build();

            //    then
            const expectedInitialState: State = new StateBuilder().withTime(1500000).withOriginalTime(1500000).withInterval(100).build();
            expect(nextState).toEqual(expectedInitialState);
        });
    });
});