// @flow

import React from "react";
import {shallow} from "enzyme";

import AppWithStore from "./AppWithStore";
import App from "../App";
import {newStore} from "../redux/storeFactory";
import {sinonTest} from "../testUtils/sinonWithTest";
import * as redux from "redux";
import {Provider} from "react-redux";
import reducers from "../redux/reducers";

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