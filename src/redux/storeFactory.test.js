// @flow
import {sinonTest} from "../testUtils/sinonWithTest";
import React from "react";
import * as redux from "redux";

import * as storeFactory from "./storeFactory";
import {AppWithStore} from "./storeFactory";
import reducers from "./reducers";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import App from "../App";
import {newStore} from "./storeFactory";

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

    /*
            <Provider store={store}>
                <App/>
            </Provider>
    * */

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