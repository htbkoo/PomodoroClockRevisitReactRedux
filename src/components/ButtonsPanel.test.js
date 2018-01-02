// @flow

import React from "react";
import {shallow} from "enzyme";

import {mapStateToProps, ButtonsPanelComponent} from "./ButtonsPanel";
import {StateBuilder} from "../redux/state";

describe('ButtonsPanel', function () {
    describe('mapStateToProps', function () {
        it('should map state to props', function () {
            //    given
            const state = new StateBuilder();

            //    when
            let props = mapStateToProps(state);

            //    then
            expect(props).toEqual({isCounting: false})
        });
    });

    describe('ButtonsPanelComponent', function () {
    });
});