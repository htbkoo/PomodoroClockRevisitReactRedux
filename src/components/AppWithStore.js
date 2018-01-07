// @flow
import React from "react";
import {Provider} from "react-redux";

import App from "../App";

import type {State} from "../redux/state";
import type {Action} from "../redux/actions";
import type {Store} from "redux";

const AppWithStore = (prop: { store: Store<State, Action> }) => (
    <Provider store={prop.store}>
        <App/>
    </Provider>
);

export default AppWithStore;