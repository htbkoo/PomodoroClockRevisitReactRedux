// @flow
import type {State} from "./state";
import {StateBuilder} from "./state";
import type {Action} from "./actions";
import * as actions from "./actions";

import reducers from "./reducers";

describe('reducers', function () {
    describe('initialState', function () {
        it('should be able to handle initialState properly', function () {
            //    given
            const expectedNextState: State = new StateBuilder().withTime(1500000).withInterval(100).build();
            expect(expectedNextState.isCounting).toEqual(false);

            //    when
            // $FlowFixMe - purposely test the ability of reducers to handle undefined action and state case
            let nextState: State = reducers(undefined, {});

            //    then
            expect(nextState).toEqual(expectedNextState);
        });
    });
    describe('startCounting', function () {
        it('should update state.isCounting to true by action.StartCountingAction', function () {
            //    given
            const action: Action = actions.startCounting();
            const state: State = new StateBuilder().build();
            const expectedNextState: State = new StateBuilder().withIsCounting(true).build();
            expect(state.isCounting).toEqual(false);

            //    when
            let nextState: State = reducers(state, action);

            //    then
            expect(nextState).toEqual(expectedNextState);
            expect(state.isCounting).toEqual(false); // ensure immutability
        });
    });
});