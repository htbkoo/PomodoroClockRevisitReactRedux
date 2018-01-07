// @flow
import {sinonTest} from "../testUtils/sinonWithTest";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import React from "react";
import * as redux from "redux";

import {AppWithStore, newStore} from "./storeFactory";
import reducers from "./reducers";
import App from "../App";

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

    describe("AppWithStore", function () {
        it("should create <AppWithStore/>", sinonTest(function () {
            //    given
            const mockStore = Symbol("mockStore");
            this.stub(redux, "createStore").withArgs(reducers).returns(mockStore);

            //    when
            let appWithStore = shallow(<AppWithStore store={newStore()}/>);

            //    then
            let provider = appWithStore.find(Provider);
            expect(provider).toHaveLength(1);
            expect(provider.prop("store")).toBe(mockStore);
            expect(provider.find(App)).toHaveLength(1);
        }));
    });
});