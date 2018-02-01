import {StateBuilder} from "./StateBuilder";
import type {State} from "../redux/state";
import {newInitialState} from "../redux/state";

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
                    clockId: "0"
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
                    clockId: "0"
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
                    clockId: "0"
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
                    clockId: "0"
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
                    clockId: "0"
                },
                clocks: {
                    byId: {},
                    allIds: []
                }
            },
            stateBuilder: new StateBuilder().withOriginalTime(100)
        },
        {
            testName: "withSessionClockId",
            expectedState: {
                interval: 0,
                session: {
                    isCounting: false,
                    time: 0,
                    originalTime: 0,
                    clockId: "1"
                },
                clocks: {
                    byId: {},
                    allIds: []
                }
            },
            stateBuilder: new StateBuilder().withSessionClockId("1")
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
                    clockId: "0"
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
                    clockId: "0"
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

    describe("baseOn", function () {
        it("should create a Builder when StateBuilder.baseOn(state)", function () {
            //    given
            const givenState = newInitialState();

            //    when
            let stateBuilder: StateBuilder = StateBuilder.baseOn(givenState);

            //    then
            expect(stateBuilder.build()).toEqual(givenState);
        });

        it("should not mutate the givenState", function () {
            //    given
            const givenState = newInitialState(), expectedGivenState = newInitialState();
            expect(givenState).toEqual(expectedGivenState);

            //    when
            let stateBuilder: StateBuilder = StateBuilder.baseOn(givenState);
            stateBuilder.withTime(1000);

            //    then
            expect(givenState).toEqual(expectedGivenState);
        });
    });

    // Simple mock clock so need to fake the flow type
    //$FlowFixMe
    function mockClock(id): Clock {
        return {id};
    }
});
