// @flow
import type {State} from "./state";
import {StateBuilder} from "./state";
import type {Action} from "./actions";
import * as actions from "./actions";

import reducers, {getInitialStateBuilder} from "./reducers";

describe('reducers', function () {
    const expectedInitialState: State = new StateBuilder().withTime(1500000).withOriginalTime(1500000).withInterval(100).build();

    describe('initialState', function () {
        it('should be able to handle initialState properly', function () {
            //    given
            expect(expectedInitialState.session.isCounting).toEqual(false);

            //    when
            // $FlowFixMe - purposely test the ability of reducers to handle undefined action and state case
            let nextState: State = reducers(undefined, {});

            //    then
            expect(nextState).toEqual(expectedInitialState);
        });
    });

    describe('getInitialStateBuilder', function () {
        it('should expose getInitialStateBuilder as the supplier to the initialStateBuilder', function () {
            //    given
            const initialStateBuilder = getInitialStateBuilder();

            //    when
            let nextState: State = initialStateBuilder.build();

            //    then
            expect(nextState).toEqual(expectedInitialState);
        });
    });

    describe('startCounting', function () {
        it('should update state.session.isCounting to true by action.StartCountingAction', function () {
            //    given
            const action: Action = actions.startCounting();
            const state: State = new StateBuilder().build();
            const expectedNextState: State = new StateBuilder().withIsCounting(true).build();
            expect(state.session.isCounting).toEqual(false);

            //    when
            let nextState: State = reducers(state, action);

            //    then
            expect(nextState).toEqual(expectedNextState);
            expect(state.session.isCounting).toEqual(false); // ensure immutability
        });
    });

    describe('pauseCounting', function () {
        it('should update state.session.isCounting to false by action.PauseCountingAction', function () {
            //    given
            const action: Action = actions.pauseCounting();
            const state: State = new StateBuilder().withIsCounting(true).build();
            const expectedNextState: State = new StateBuilder().withIsCounting(false).build();

            //    when
            let nextState: State = reducers(state, action);

            //    then
            expect(nextState).toEqual(expectedNextState);
            expect(state.session.isCounting).toEqual(true); // ensure immutability
        });
    });

    describe('stopCounting', function () {
        it('should update state.session.isCounting to false and reset state.session.time by action.StopCountingAction', function () {
            //    given
            const action: Action = actions.stopCounting();
            const state: State = new StateBuilder().withIsCounting(true).withOriginalTime(1000).build();
            const expectedNextState: State = new StateBuilder().withIsCounting(false).withOriginalTime(1000).withTime(1000).build();

            //    when
            let nextState: State = reducers(state, action);

            //    then
            expect(nextState).toEqual(expectedNextState);
            expect(state.session.isCounting).toEqual(true); // ensure immutability
        });
    });

    describe('tickTIme', function () {
        it('should subtract state.session.time by lapse when action.TickTimeAction(lapse)', function () {
            //    given
            const startTime = 1000, lapse = 100, expectedTIme = 900;
            const action: Action = actions.tickTime(lapse);
            const state: State = new StateBuilder().withTime(startTime).build();
            const expectedNextState: State = new StateBuilder().withTime(expectedTIme).build();
            expect(state.session.time).toEqual(startTime);

            //    when
            let nextState: State = reducers(state, action);

            //    then
            expect(nextState).toEqual(expectedNextState);
            expect(state.session.time).toEqual(startTime); // ensure immutability
        });
    });
});