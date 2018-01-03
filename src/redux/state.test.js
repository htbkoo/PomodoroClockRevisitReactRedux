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

        it("should be able build state", function () {
            //    given
            const expectedState = {
                isCounting: false,
                session: {
                    time: 1000,
                    clockId: 0
                },
                clocks: List()
            };
            const stateBuilder = new StateBuilder();

            //    when
            let state: State = stateBuilder.withTime(1000).build();

            //    then
            expect(state).toEqual(expectedState);
        });
    });
});