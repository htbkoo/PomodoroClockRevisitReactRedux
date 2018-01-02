// @flow

import React from "react";

import {mapStateToProps} from "./ButtonsPanel";
import {StateBuilder} from "../redux/state";

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
});