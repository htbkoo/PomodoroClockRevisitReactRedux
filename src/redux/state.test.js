// @flow

import type {State} from "./state";
import {StateBuilder} from "./state";
import {List} from "immutable";

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
                    clocks: List()
                },
                stateBuilder: new StateBuilder()
            }, {
            testName: "withTime",
            expectedState: {
                isCounting: false,
                session: {
                    time: 1000,
                    clockId: 0
                },
                clocks: List()
            },
            stateBuilder: new StateBuilder().withTime(1000)
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