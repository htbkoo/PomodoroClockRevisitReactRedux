// @flow
import type {State} from "./state";
import {StateBuilder} from "./state";
import type {Action} from "./actions";
import {actionTypes} from "./actions";

const getInitialStateBuilder = (): StateBuilder => new StateBuilder().withTime(1500000).withInterval(100);
const initialState: State = getInitialStateBuilder().build();

export {getInitialStateBuilder};

export default function reducers(state: State = initialState, action: Action): State {
    switch (action.type) {
        case actionTypes.StartCounting:
            return Object.assign({}, state, {isCounting: true});
        case actionTypes.PauseCounting:
            return Object.assign({}, state, {isCounting: false});
        case actionTypes.TickTime:
            let time = state.session.time - action.lapse;
            let session = Object.assign({}, state.session, {time});
            return Object.assign({}, state, {session});
        default:
            return state;
    }
}