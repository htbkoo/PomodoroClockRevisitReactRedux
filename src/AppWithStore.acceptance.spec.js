// @flow
import React from 'react';
import {mount} from "enzyme";
import jsonpath from "jsonpath";

import {newStore} from "./redux/storeFactory";
import AppWithStore from "./components/AppWithStore";

jest.useFakeTimers();

describe('AppWithStore - acceptance test', function () {
    it('should be able to render with store without crash', function () {
        // given
        const store = newStore();

        // when
        mount(<AppWithStore store={store}/>);
    });

    it('should be able to click start then change state.isCounting to true', function () {
        // given
        const {store, app} = getStoreAndApp();
        const getStartButton = () => app.find("#btn_start");

        expect(getStartButton()).toHaveLength(1);

        // when
        getStartButton().simulate("click");

        // then
        assertStoreState(store).toHave("isCounting", true);
        expect(getStartButton()).toHaveLength(0);
    });

    it('should, when state.isCounting=true, count down the time per 100ms', function () {
        //    given
        const {store, app} = getStoreAndApp();
        const startTime = getTime(store);
        clickStartButton(app);
        assertStoreState(store).toHave("isCounting", true);
        expect(getTime(store)).toEqual(startTime);

        //    when
        jest.runTimersToTime(100);

        //    then
        expect(getTime(store)).toEqual(startTime - 100);
    });

    it('should, when state.isCounting=false, not count down the time', function () {
        //    given
        const store = newStore();
        mount(<AppWithStore store={store}/>);

        assertStoreState(store).toHave("isCounting", false);
        const startTime = getTime(store);

        //    when
        jest.runTimersToTime(100);

        //    then
        expect(getTime(store)).toEqual(startTime);
    });

    function getStoreAndApp() {
        const store = newStore();
        const app = mount(<AppWithStore store={store}/>);
        assertStoreState(store).toHave("isCounting", false);
        return {store, app};
    }

    function assertStoreState(store) {
        const state = store.getState();

        return {
            toHave(key, value) {
                expect(key in state).toEqual(true);
                expect(state.isCounting).toEqual(value);
            }
        }
    }

    function clickStartButton(app) {
        app.find("#btn_start").simulate("click");
    }

    function getTime(store) {
        return jsonpath.value(store.getState(), "$.session.time");
    }
});