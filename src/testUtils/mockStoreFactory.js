import configureMockStore from 'redux-mock-store';

import {StateBuilder} from "../redux/state";

const middlewares = [];
const createMockStore = configureMockStore(middlewares);

function getDefaultStore() {
    const state = new StateBuilder().build();
    return createMockStore(state);
}

export {createMockStore, getDefaultStore};