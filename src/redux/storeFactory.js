// @flow
import React from "react";
import type {Reducer, Store} from "redux";
import {createStore} from "redux";

import type {State} from "./state";
import type {Action} from "./actions";
import defaultReducers from "./reducers";

function newStore(reducers: Reducer<State, Action> = defaultReducers): Store<State, Action> {
    return createStore(reducers);
}

export {newStore};