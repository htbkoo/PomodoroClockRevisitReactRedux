// @flow

import type {State} from "./state";
import {StateBuilder} from "./state";

describe('state', function () {
    describe("StateBuilder", function () {
        [
            {
                testName: "default for builder",
                expectedState: {
                    isCounting: false,
                    session: {
                        time: 0,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder()
            },
            {
                testName: "withTime",
                expectedState: {
                    isCounting: false,
                    session: {
                        time: 1000,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder().withTime(1000)
            },
            {
                testName: "withIsCounting",
                expectedState: {
                    isCounting: true,
                    session: {
                        time: 0,
                        clockId: 0
                    },
                    clocks: []
                },
                stateBuilder: new StateBuilder().withIsCounting(true)
            }
        ].forEach(({testName, expectedState, stateBuilder}) =>
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