// @flow
import React from 'react';
import {mount} from "enzyme";
import jsonpath from "jsonpath";

import {newStore, newStoreWithPredefinedState} from "./redux/storeFactory";
import AppWithStore from "./components/AppWithStore";
import type {State} from "./redux/state";
import {StateBuilder} from "./redux/state";

jest.useFakeTimers();

describe('AppWithStore - acceptance test', function () {
    const isCountingState = new StateBuilder().withIsCounting(true).build();

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

    it('should update state.isCounting to false when clicking pause button', function () {
        //    given
        const store = getStore(isCountingState);
        const app = mount(<AppWithStore store={store}/>);
        assertStoreState(store).toHave("isCounting", true);

        //    when
        app.find("#btn_pause").simulate("click");

        //    then
        assertStoreState(store).toHave("isCounting", false);
    });

    describe("store state", function () {
        it("should have state.isCounting=false for getStore()", function () {
            // given
            const store = getStore();
            assertStoreState(store).toHave("isCounting", false);

            // when
            mount(<AppWithStore store={store}/>);

            // then
            assertStoreState(store).toHave("isCounting", false);
        });

        it("should have state.isCounting=true for getStore(isCountingState)", function () {
            // given
            const store = getStore(isCountingState);
            assertStoreState(store).toHave("isCounting", true);

            // when
            mount(<AppWithStore store={store}/>);

            // then
            assertStoreState(store).toHave("isCounting", true);
        });
    });

    function getStoreAndApp() {
        const store = getStore();
        const app = mount(<AppWithStore store={store}/>);
        assertStoreState(store).toHave("isCounting", false);
        return {store, app};
    }

    function getStore(predefinedState: ?State) {
        return ((typeof predefinedState === "undefined") || (predefinedState === null))
            ? newStore()
            : newStoreWithPredefinedState(predefinedState);
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