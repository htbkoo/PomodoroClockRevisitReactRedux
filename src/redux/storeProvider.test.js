// @flow
import {sinonTest} from "../testUtils/sinonWithTest";
import * as redux from "redux";

import * as storeProvider from "./storeProvider";
import reducers from "./reducers";

describe('storeProvider', function () {
    it('should create a store', sinonTest(function () {
        //    given
        const mockStore = Symbol("mockStore");
        this.stub(redux, "createStore").withArgs(reducers).returns(mockStore);

        //    when
        let store = storeProvider.newStore(reducers);

        //    then
        expect(store).toEqual(mockStore);
    }));
});