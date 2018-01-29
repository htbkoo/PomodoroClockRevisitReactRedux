// @flow
import type {Reducer, Store} from "redux";
import {createStore} from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension';

import type {State} from "./state";
import {newInitialState} from "./state";
import type {Action} from "./actions";
import defaultReducers from "./reducers";

const defaultInitialState = newInitialState();

function newStore(predefinedState: State = defaultInitialState, reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    if (typeof window !== 'undefined') {
        return newStoreWithReduxDevtoolsExtension(predefinedState, reducers);
    } else {
        return createStore(reducers, predefinedState);
    }
}

// untested
function newStoreWithReduxDevtoolsExtension(predefinedState: State = defaultInitialState, reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    return createStore(reducers, predefinedState, devToolsEnhancer());
}

export {newStore};