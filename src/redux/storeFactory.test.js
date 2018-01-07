// @flow
import {sinonTest} from "../testUtils/sinonWithTest";
import * as redux from "redux";

import * as storeFactory from "./storeFactory";
import reducers from "./reducers";

describe('storeFactory', function () {
    describe("newStore", function () {
        it('should create a store', sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore");
            this.stub(redux, "createStore").withArgs(reducers).returns(mockStore);

            //    when
            let store = storeFactory.newStore(reducers);

            //    then
            expect(store).toEqual(mockStore);
        }));

        it('should create default store using default reducers if no reducers parameter is provided', sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore");
            this.stub(redux, "createStore").withArgs(reducers).returns(mockStore);

            //    when
            let store = storeFactory.newStore();

            //    then
            expect(store).toEqual(mockStore);
        }));
    });
});