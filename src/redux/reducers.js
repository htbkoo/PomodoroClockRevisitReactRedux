// @flow
import type {State} from "./state";
import type {Action} from "./actions";

export default function reducers(state: State, action: Action): State {
    return Object.assign({}, state, {isCounting: true});
}