// @flow

import React from "react";
import {shallow} from "enzyme";

import {StartButtonComponent, mapDispatchToProps} from "./StartButton";
import {startCounting} from "../redux/actions";

describe('StartButton', function () {
    describe('mapDispatchToProps', function () {
        it('should map dispatch to props', function () {
            //    given
            const spyDispatch = jest.fn();

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onStartClick();

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(startCounting());
        });
    });

    describe('StartButtonComponent', function () {
        it('should have a <button id="btn_start"/>', function () {
            //    given
            //    when
            let startButton = shallow(<StartButtonComponent/>);

            //    then
            let button = startButton.find("button");
            expect(button).toHaveLength(1);
            expect(button).toMatchSelector("#btn_start");
        });
    });
});