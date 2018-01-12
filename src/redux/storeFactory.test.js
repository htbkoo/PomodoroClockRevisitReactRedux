// @flow
import {sinonTest} from "../testUtils/sinonWithTest";
import React from "react";
import * as redux from "redux";

import {newStore, newStoreWithPredefinedState} from "./storeFactory";
import reducers from "./reducers";
import {StateBuilder} from "./state";
import type {State} from "./state";

describe('storeFactory', function () {
    describe("newStore", function () {
        it('should create a store', sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore");
            this.stub(redux, "createStore").withArgs(reducers).returns(mockStore);

            //    when
            let store = newStore(reducers);

            //    then
            expect(store).toEqual(mockStore);
        }));

        it('should create default store using default reducers if no reducers parameter is provided', sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore");
            this.stub(redux, "createStore").withArgs(reducers).returns(mockStore);

            //    when
            let store = newStore();

            //    then
            expect(store).toEqual(mockStore);
        }));
    });

    describe("newStoreWithState", function () {
        it('should create a store with a predefined state', sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore"), state: State = new StateBuilder().build();
            this.stub(redux, "createStore").withArgs(reducers, state).returns(mockStore);

            //    when
            let store = newStoreWithPredefinedState(reducers, state);

            //    then
            expect(store).toEqual(mockStore);
        }));
    });
});