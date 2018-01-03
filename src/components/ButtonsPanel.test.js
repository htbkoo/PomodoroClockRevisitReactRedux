// @flow

import React from "react";
import {shallow} from "enzyme";

import {mapStateToProps, ButtonsPanelComponent} from "./ButtonsPanel";

import {StateBuilder} from "../redux/state";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";

describe('ButtonsPanel', function () {
    describe('mapStateToProps', function () {
        it('should map state to props', function () {
            //    given
            const state = new StateBuilder().build();

            //    when
            let props = mapStateToProps(state);

            //    then
            expect(props).toEqual({isCounting: false})
        });
    });

    describe('ButtonsPanelComponent', function () {
        it('should have a <StartButton/> and no <PauseButton/> when props.isCounting=false', function () {
            //    given
            const isCounting = false;

            //    when
            let buttonsPanel = shallow(<ButtonsPanelComponent isCounting={isCounting}/>);

            //    then
            expect(buttonsPanel.find(StartButton)).toHaveLength(1);
            expect(buttonsPanel.find(PauseButton)).toHaveLength(0);
        });
    });
});