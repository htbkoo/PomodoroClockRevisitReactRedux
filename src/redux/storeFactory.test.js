// @flow
import {sinonTest} from "../testUtils/sinonWithTest";
import React from "react";
import * as redux from "redux";

import {newStore} from "./storeFactory";
import reducers from "./reducers";

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
});