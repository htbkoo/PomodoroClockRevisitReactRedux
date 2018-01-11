// @flow

import React from "react";

import {mapDispatchToProps} from "./PauseButton";
import {pauseCounting} from "../redux/actions";

describe('PauseButton', function () {
    describe('mapDispatchToProps', function () {
        it('should map dispatch to props', function () {
            //    given
            const spyDispatch = jest.fn();

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onPauseClick();

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(pauseCounting());
        });
    });
});