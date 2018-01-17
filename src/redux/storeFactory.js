// @flow
import type {Reducer, Store} from "redux";
import {createStore} from "redux";

import type {State} from "./state";
import type {Action} from "./actions";
import defaultReducers, {getInitialStateBuilder} from "./reducers";

const defaultInitialState = getInitialStateBuilder().build();

function newStore(predefinedState: State = defaultInitialState, reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    return createStore(reducers, predefinedState);
}

export {newStore};