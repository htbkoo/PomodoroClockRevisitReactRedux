// @flow
import type {State} from "./state";
import {StateBuilder} from "./state";
import type {Action} from "./actions";
import {StartCountingAction} from "./actions";

const initialState: State = new StateBuilder().withTime(1500000).build();

export default function reducers(state: State = initialState, action: Action): State {
    switch (action.type) {
        case StartCountingAction.type:
            return Object.assign({}, state, {isCounting: true});
        default:
            return state;
    }
}