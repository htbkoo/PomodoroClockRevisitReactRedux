// @flow

import React from "react";
import {shallow} from "enzyme";
import {Provider} from "react-redux";

import App from "../App";
import {getDefaultStore} from "../testUtils/mockStoreFactory";

describe("AppWithStore", function () {
    const mockStore = getDefaultStore();

    beforeEach(function () {
        jest.mock("../redux/storeFactory", () => ({
            newStore() {
                return mockStore;
            }
        }));
    });

    afterEach(function () {
        jest.unmock("../redux/storeFactory");
    });

    it("should create <AppWithStore/>", function () {
        //    given
        const AppWithStore = require("./AppWithStore").default;

        const store = getDefaultStore();

        //    when
        let appWithStore = shallow(<AppWithStore store={store}/>);

        //    then
        let provider = appWithStore.find(Provider);
        expect(provider).toHaveLength(1);
        expect(provider.prop("store")).toBe(store);
        expect(provider.find(App)).toHaveLength(1);
    });

    it("should create <AppWithStore/> using default store if no store parameter is provided ", function () {
        //    given
        const AppWithStore = require("./AppWithStore").default;

        //    when
        let appWithStore = shallow(<AppWithStore/>);

        //    then
        let provider = appWithStore.find(Provider);
        expect(provider).toHaveLength(1);
        expect(provider.prop("store")).toBe(mockStore);
        expect(provider.find(App)).toHaveLength(1);
    });
});