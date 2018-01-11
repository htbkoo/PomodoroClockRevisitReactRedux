// @flow

import React from "react";
import {shallow} from "enzyme";

import {StartButtonComponent, mapDispatchToProps} from "./StartButton";
import {startCounting} from "../redux/actions";
import {NO_OP} from "../utils/functionUtil";

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
            let startButton = shallow(<StartButtonComponent onStartClick={NO_OP}/>);

            //    then
            let button = startButton.find("#btn_start");
            expect(button).toHaveLength(1);
        });

        it('should call props.onStartClick() when #btn_start.click()', function () {
            //    given
            const spyOnStartClick = jest.fn();
            const startButton = shallow(<StartButtonComponent onStartClick={spyOnStartClick}/>);

            //    when
            let button = startButton.find("#btn_start");
            button.simulate("click");

            //    then
            expect(spyOnStartClick).toHaveBeenCalledTimes(1);
        });
    });
});