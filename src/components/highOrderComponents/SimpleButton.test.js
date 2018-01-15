// @flow

import React from "react";
import {shallow} from "enzyme";

import {SimpleButtonComponent} from "./SimpleButton";
import {pauseCounting} from "../../redux/actions";

describe('SimpleButton', function () {
    describe('SimpleButtonComponent', function () {
        it('should have a #givenId', function () {
            //    given
            const givenId = "givenId";
            const action = pauseCounting();
            const dispatch = jest.fn();

            //    when
            let simpleButton = shallow(<SimpleButtonComponent buttonId={givenId} action={action} dispatch={dispatch}/>);

            //    then
            let button = simpleButton.find(`#${givenId}`);
            expect(button).toHaveLength(1);
        });

        it('should call props.dispatch(action) when #someId.click()', function () {
            //    given
            const buttonId = "someId";
            const action = pauseCounting();
            const spyDispatch = jest.fn();
            const simpleButton = shallow(<SimpleButtonComponent buttonId={buttonId}
                                                                action={action}
                                                                dispatch={spyDispatch}/>);

            //    when
            let button = simpleButton.find(`#${buttonId}`);
            button.simulate("click");

            //    then
            expect(spyDispatch).toHaveBeenCalledTimes(1);
            expect(spyDispatch).toHaveBeenCalledWith(action);
        });
    });
});