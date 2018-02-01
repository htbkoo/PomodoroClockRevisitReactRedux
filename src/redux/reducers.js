// @flow

import {combineReducers} from "redux";

import type {Clocks, Session} from "./state";
import {newInitialState} from "./state";
import type {Action} from "./actions";
import {actionTypes} from "./actions";

const defaultInitialState = newInitialState();

export default combineReducers({
    interval,
    session,
    clocks
});

function session(state: Session = defaultInitialState.session, action: Action): Session {
    switch (action.type) {
        case actionTypes.StartCounting: {
            let isCounting = true;
            return Object.assign({}, state, {isCounting});
        }
        case actionTypes.PauseCounting: {
            let isCounting = false;
            return Object.assign({}, state, {isCounting});
        }
        case actionTypes.StopCounting: {
            let time = action.originalTime;
            let isCounting = false;
            return Object.assign({}, state, {time, isCounting});
        }
        case actionTypes.TickTime: {
            let time = state.time - action.lapse;
            return Object.assign({}, state, {time});
        }
        case actionTypes.TimesUp: {
            let time = action.nextDuration;
            let isCounting = false;
            return Object.assign({}, state, {time, isCounting});
        }
        default:
            return state;
    }
}

function clocks(state: Clocks = defaultInitialState.clocks): Clocks {
    return state;
}

function interval(state: number = defaultInitialState.interval): number {
    return state;
}