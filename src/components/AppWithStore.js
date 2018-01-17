// @flow
import React from "react";
import {Provider} from "react-redux";

import App from "../App";

import type {State} from "../redux/state";
import type {Action} from "../redux/actions";
import type {Store} from "redux";
import {newStoreWithPredefinedState} from "../redux/storeFactory";

type Props = {
    +store: Store<State, Action>
};

// It is being exported, but IntelliJ failed to notice this
// noinspection JSUnusedGlobalSymbols
const AppWithStore = (props: Props) => (
    <Provider store={props.store}>
        <App/>
    </Provider>
);

AppWithStore.defaultProps = {
    store: newStoreWithPredefinedState()
};

// It is in use by require(), but IntelliJ failed to spot this
// noinspection JSUnusedGlobalSymbols
export default AppWithStore;