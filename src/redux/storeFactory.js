// @flow
import type {Reducer, Store} from "redux";
import {createStore} from "redux";
import type {State} from "./state";
import type {Action} from "./actions";

export function newStore(reducers: Reducer<State, Action>): Store<State, Action> {
    return createStore(reducers);
}