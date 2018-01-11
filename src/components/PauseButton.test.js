// @flow

import React from "react";
import {shallow} from "enzyme";

import {mapDispatchToProps, PauseButtonComponent} from "./PauseButton";
import {pauseCounting} from "../redux/actions";
import {NO_OP} from "../utils/functionUtil";

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

    describe('PauseButtonComponent', function () {
        it('should have a <button id="btn_pause"/>', function () {
            //    given
            //    when
            let pauseButton = shallow(<PauseButtonComponent onPauseClick={NO_OP}/>);

            //    then
            let button = pauseButton.find("#btn_pause");
            expect(button).toHaveLength(1);
        });
    });
});