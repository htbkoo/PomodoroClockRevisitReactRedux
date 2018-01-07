// @flow
import React from 'react';
import {mount} from "enzyme";

import ButtonsPanel from "./components/ButtonsPanel";
import {newStore} from "./redux/storeFactory";
import AppWithStore from "./components/AppWithStore";
import type {State} from "./redux/state";

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
        const store = newStore();
        const app = mount(<AppWithStore store={store}/>);
        const getButtonsPanel = () => app.find(ButtonsPanel);
        const getStartButton = () => app.find("#btn_start");

        expect(getButtonsPanel()).toHaveLength(1);

        expect("isCounting" in store.getState()).toEqual(true);
        expect(store.getState().isCounting).toEqual(false);
        expect(getStartButton()).toHaveLength(1);

        // when
        getStartButton().simulate("click");

        // then
        expect("isCounting" in store.getState()).toEqual(true);
        expect(store.getState().isCounting).toEqual(true);
        expect(getStartButton()).toHaveLength(0);
    });

    it('should, when state.isCounting=true, count down the time per 100ms', function () {
        //    given
        const store = newStore();
        const app = mount(<AppWithStore store={store}/>);
        const getState: () => State = store.getState;
        expect(getState().isCounting).toEqual(false);

        const startTime = getState().session.time;

        //    when
        app.find("#btn_start").simulate("click");
        expect(getState().session.time).toEqual(startTime);

        jest.runTimersToTime(100);

        //    then
        expect(getState().session.time).toEqual(startTime - 100);
    });

    xit('should, when state.isCounting=false, not count down the time', function () {
    });
});