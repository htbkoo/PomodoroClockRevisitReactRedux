// @flow
import type {Reducer, Store} from "redux";
import {createStore} from "redux";

import type {State} from "./state";
import type {Action} from "./actions";
import defaultReducers from "./reducers";

function newStore(reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    return createStore(reducers);
}

function newStoreWithPredefinedState(predefinedState: State, reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    return createStore(reducers, predefinedState);
}

export {newStore, newStoreWithPredefinedState};