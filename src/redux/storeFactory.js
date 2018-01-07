// @flow
import React from "react";
import type {Reducer, Store} from "redux";
import {createStore} from "redux";
import {Provider} from "react-redux";

import type {State} from "./state";
import type {Action} from "./actions";
import defaultReducers from "./reducers";
import App from "../App";

function newStore(reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    return createStore(reducers);
}

const AppWithStore = (prop: { store: Store<State, Action> }) => (
    <Provider store={prop.store}>
        <App/>
    </Provider>
);

export {newStore, AppWithStore};