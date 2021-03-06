// @flow
import {sinon, sinonTest} from "../testUtils/sinonWithTest";
import React from "react";
import * as redux from "redux";

import {newStore} from "./storeFactory";
import reducers from "./reducers";
import type {State} from "./state";
import {newInitialState} from "./state";
import {StateBuilder} from "../testUtils/StateBuilder";

describe('storeFactory', function () {
    describe("newStoreWithState", function () {
        it('should create a store with a predefined state', sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore"), state: State = new StateBuilder().build();
            this.stub(redux, "createStore").withArgs(reducers, state).returns(mockStore);

            //    when
            let store = newStore(state, reducers);

            //    then
            expect(store).toEqual(mockStore);
        }));

        it('should, when predefinedState is not provided, create a store with defaultInitialState', sinonTest(function () {
            //    given
            const defaultInitialState: State = newInitialState();
            const mockStore = Symbol("mockStore");
            this.stub(redux, "createStore").withArgs(reducers, sinon.match(defaultInitialState)).returns(mockStore);

            //    when
            let store = newStore();

            //    then
            expect(store).toEqual(mockStore);
        }));
    });
});