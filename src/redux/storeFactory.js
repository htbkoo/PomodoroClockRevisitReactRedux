// @flow
import type {Reducer, Store} from "redux";
import {createStore} from "redux";

import type {State} from "./state";
import type {Action} from "./actions";
import defaultReducers from "./reducers";
import {newInitialStateBuilder} from "./state";

const defaultInitialState = newInitialStateBuilder().build();

function newStore(predefinedState: State = defaultInitialState, reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    if (typeof window !== 'undefined') {
        return newStoreWithReduxDevtoolsExtension(predefinedState, reducers);
    } else {
        return createStore(reducers, predefinedState);
    }
}

// untested
function newStoreWithReduxDevtoolsExtension(predefinedState: State = defaultInitialState, reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    return createStore(reducers, predefinedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export {newStore};