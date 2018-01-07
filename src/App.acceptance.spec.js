// @flow
import React from 'react';
import {mount} from "enzyme";

import ButtonsPanel from "./components/ButtonsPanel";
import {newStore} from "./redux/storeFactory";
import AppWithStore from "./components/AppWithStore";

describe('App - acceptance test', function () {
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

    xit('should, when state.isCounting=true, count down the time per 100ms', function () {
    });

    xit('should, when state.isCounting=false, not count down the time', function () {
    });
});