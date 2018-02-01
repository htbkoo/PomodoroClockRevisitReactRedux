// @flow

import type {State} from "./state";
import {newInitialState} from "./state";

describe('state', function () {
    describe('getInitialState', function () {
        it('should expose newInitialState as the supplier to a new instance of initialState', function () {
            //    given

            //    when
            const initialState = newInitialState();

            //    then
            const expectedInitialState: State = {
                interval: 100,
                session: {
                    isCounting: false,
                    time: 1500000,
                    clockId: "0"
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
            expect(initialState).toEqual(expectedInitialState);
        });
    });
});