// @flow

import React from "react";
import {shallow} from "enzyme";

import {mapStateToProps , ClockComponent} from "./Clock";
import {StateBuilder} from "../redux/state";

describe('Clock', function () {
    describe("mapStateToProps", function () {
        it("should mapStateToProps", function () {
            //    given
            const state = new StateBuilder().withTime(1000).build();

            //    when
            let props = mapStateToProps(state);

            //    then
            expect(props).toEqual({clockId: 0, time: 1000});
        });
    });

    describe("ClockComponent", function () {
        [
            {time: 0, expectedText: "00m 00s 000"},
            {time: 99, expectedText: "00m 00s 099"},
            {time: 100, expectedText: "00m 00s 100"},
            {time: 999, expectedText: "00m 00s 999"},
            {time: 1000, expectedText: "00m 01s 000"},
            {time: 1001, expectedText: "00m 01s 001"},
            {time: 1999, expectedText: "00m 01s 999"},
            {time: 2000, expectedText: "00m 02s 000"},
            {time: 10999, expectedText: "00m 10s 999"},
            {time: 59999, expectedText: "00m 59s 999"},
            {time: 60000, expectedText: "01m 00s 000"},
            {time: 60001, expectedText: "01m 00s 001"},
            {time: 61001, expectedText: "01m 01s 001"},
        ].forEach(({time, expectedText}) =>
            it(`should render props.time=${time} as ${expectedText}`, function () {
                //    given
                //    when
                let clock = shallow(<ClockComponent time={time}/>);

                //    then
                expect(clock).toHaveText(expectedText);
            })
        );
    });
});