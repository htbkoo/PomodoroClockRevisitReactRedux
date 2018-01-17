// @flow
import {sinon, sinonTest} from "../testUtils/sinonWithTest";
import React from "react";
import * as redux from "redux";

import {newStoreWithPredefinedState} from "./storeFactory";
import reducers, {getInitialStateBuilder} from "./reducers";
import type {State} from "./state";
import {StateBuilder} from "./state";

describe('storeFactory', function () {
    describe("newStoreWithState", function () {
        it('should create a store with a predefined state', sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore"), state: State = new StateBuilder().build();
            this.stub(redux, "createStore").withArgs(reducers, state).returns(mockStore);

            //    when
            let store = newStoreWithPredefinedState(state, reducers);

            //    then
            expect(store).toEqual(mockStore);
        }));

        it('should, when predefinedState is not provided, create a store with defaultInitialState', sinonTest(function () {
            //    given
            const defaultInitialState: State = getInitialStateBuilder().build();
            const mockStore = Symbol("mockStore");
            this.stub(redux, "createStore").withArgs(reducers, sinon.match(defaultInitialState)).returns(mockStore);

            //    when
            let store = newStoreWithPredefinedState();

            //    then
            expect(store).toEqual(mockStore);
        }));
    });
});