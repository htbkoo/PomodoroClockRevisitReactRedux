// @flow
import type {State} from "./state";
import type {Action} from "./actions";
import {actionTypes} from "./actions";

export default function reducers(state: State, action: Action): State {
    switch (action.type) {
        case actionTypes.StartCounting:{
            let isCounting = true;
            let session = Object.assign({}, state.session, {isCounting});
            return Object.assign({}, state, {session});
        }
        case actionTypes.PauseCounting: {
            let isCounting = false;
            let session = Object.assign({}, state.session, {isCounting});
            return Object.assign({}, state, {session});
        }
        case actionTypes.StopCounting: {
            let time = state.session.originalTime;
            let isCounting= false;
            let session = Object.assign({}, state.session, {time, isCounting});
            return Object.assign({}, state, {session});
        }
        case actionTypes.TickTime: {
            let time = state.session.time - action.lapse;
            let session = Object.assign({}, state.session, {time});
            return Object.assign({}, state, {session});
        }
        default:
            return state;
    }
}