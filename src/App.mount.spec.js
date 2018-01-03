// @flow
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import React from 'react';
import {mount} from "enzyme";

import App from './App';
import {StateBuilder} from "./redux/state";
import ButtonsPanel from "./components/ButtonsPanel";

describe('App - mount test', function () {
    const middlewares = [];
    const createMockStore = configureMockStore(middlewares);

    it('renders without crashing', () => {
        const store = getDefaultStore();

        mount(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    });

    it('should be able to display default time', function () {
        // given
        const state = new StateBuilder().withTime(1500000).build();
        const store = createMockStore(state);
        const expectedTime = "25m 00s 000";

        // when
        let app = mount(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        let clockTime = app.find("#clock-time");

        // then
        expect(clockTime).toIncludeText(expectedTime)
    });

    it('should be able to click start then change state.isCounting to true', function () {
        // given
        const store = getDefaultStore();
        const app = mount(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const getButtonsPanel = () => app.find(ButtonsPanel);
        const getStartButton = () => app.find("#btn_start");

        expect(getButtonsPanel()).toHaveLength(1);

        expect("isCounting" in store.getState()).toEqual(true);
        expect(store.getState().isCounting).toEqual(false);
        expect(getStartButton()).toHaveLength(1);

        // when
        getStartButton().simulate("click");

        // then
        // TODO
        // expect("isCounting" in store.getState()).toEqual(true);
        // expect(store.getState().isCounting).toEqual(true);
        // expect(getStartButton()).toHaveLength(0);
    });

    xit('should, when state.isCounting=true, count down the time per 100ms', function () {
    });

    xit('should, when state.isCounting=false, not count down the time', function () {
    });

    function getDefaultStore() {
        const state = new StateBuilder().build();
        return createMockStore(state);
    }
});