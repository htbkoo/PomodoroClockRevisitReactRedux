// @flow
import React from "react";
import {Provider} from "react-redux";

import App from "../App";

import type {State} from "../redux/state";
import type {Action} from "../redux/actions";
import type {Store} from "redux";
import {newStore} from "../redux/storeFactory";

type Props = {
    +store: Store<State, Action>
};

const AppWithStore = (props: Props) => (
    <Provider store={props.store}>
        <App/>
    </Provider>
);

AppWithStore.defaultProps = {
    store: newStore()
};

export default AppWithStore;