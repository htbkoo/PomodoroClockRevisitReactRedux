// @flow

import React from "react";
import {shallow} from "enzyme";

import Clock from "./Clock";

describe('Clock', function () {
    [
        {time: 0, expectedText: "00m 00s 000"},
        {time: 100, expectedText: "00m 00s 100"},
        {time: 1000, expectedText: "00m 01s 000"},
    ].forEach(({time, expectedText}) =>
        it(`should render props.time=${time} as ${expectedText}`, function () {
            //    given
            //    when
            let clock = shallow(<Clock time={time}/>);

            //    then
            expect(clock).toHaveText(expectedText);
        })
    );
});