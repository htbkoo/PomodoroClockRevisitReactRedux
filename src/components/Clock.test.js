// @flow

import React from "react";
import {shallow} from "enzyme";

import Clock from "./Clock";

describe('Clock', function () {
    it('should render props.time=1000 as 00m 01s 000', function () {
        //    given
        //    when
        let clock = shallow(<Clock time={1000}/>);

        //    then
        expect(clock).toHaveText("00m 01s 000");
    });

    it('should render props.time=0 as 00m 00s 000', function () {
        //    given
        //    when
        let clock = shallow(<Clock time={0}/>);

        //    then
        expect(clock).toHaveText("00m 00s 000");
    });
});