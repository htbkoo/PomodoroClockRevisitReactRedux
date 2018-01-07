// @flow

import React from "react";
import {shallow} from "enzyme";
import {sinonTest} from "../testUtils/sinonWithTest";
import * as redux from "redux";
import {Provider} from "react-redux";

import AppWithStore from "./AppWithStore";

import App from "../App";
import {newStore} from "../redux/storeFactory";
import reducers from "../redux/reducers";
import {getDefaultStore} from "../testUtils/mockStoreFactory";

describe("AppWithStore", function () {
    it("should create <AppWithStore/>", function () {
        //    given
        const mockStore = getDefaultStore();

        //    when
        let appWithStore = shallow(<AppWithStore store={mockStore}/>);

        //    then
        let provider = appWithStore.find(Provider);
        expect(provider).toHaveLength(1);
        expect(provider.prop("store")).toBe(mockStore);
        expect(provider.find(App)).toHaveLength(1);
    });
});