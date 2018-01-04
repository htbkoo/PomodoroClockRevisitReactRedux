// @flow

import React from "react";

import StartButton, {mapDispatchToProps} from "./StartButton";

describe('StartButton', function () {
    describe('mapDispatchToProps', function () {
        it('should map dispatch to props', function () {
            //    given
            const spyDispatch = jest.fn();

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onStartClick();

            //    then
            expect(spyDispatch).toHaveBeenCalledTimes(1);
        });
    });
});