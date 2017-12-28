// @flow

import type {State} from "./state";
import {StateBuilder} from "./state";
import {List} from "immutable";

describe('state', function () {
    describe("StateBuilder", function () {
        it("should be able build state", function () {
            //    given
            const defaultState = {
                isCounting: false,
                session: {
                    time: 0,
                    clockId: 0
                },
                clocks: List()
            };
            const stateBuilder = new StateBuilder();

            //    when
            let state: State = stateBuilder.build();

            //    then
            expect(state).toEqual(defaultState);
        });
    });
});