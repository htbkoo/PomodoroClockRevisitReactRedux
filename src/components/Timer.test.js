// @flow

import React from "react";
import {shallow} from "enzyme";

import {formatTime, mapStateToProps, TimerComponent} from "./Timer";
import {StateBuilder} from "../testUtils/StateBuilder";
import CircularProgressbar from "react-circular-progressbar";

describe('Timer', function () {
    describe("mapStateToProps", function () {
        it("should mapStateToProps", function () {
            //    given
            const time = 1000;
            const state = new StateBuilder().withTime(time).build();

            //    when
            let props = mapStateToProps(state);

            //    then
            expect(props).toEqual({time});
        });
    });

    describe("formatTime", function () {
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
                let formattedText = formatTime(time);

                //    then
                expect(formattedText).toEqual(expectedText);
            })
        );
    });

    describe("TimerComponent", function () {
        it(`should have a <CircularProgressbar percentage={props.percentage}/> in <Timer/>`, function () {
            //    given
            const expectedText = "00m 01s 999", expectedPercentage = 75;
            const timer = shallow(<TimerComponent time={1999} percentage={expectedPercentage}/>);

            //    when
            let progressbar = timer.find(CircularProgressbar);

            //    then
            expect(progressbar).toHaveProp("percentage", expectedPercentage);
            expect(progressbar.prop("textForPercentage")()).toEqual(expectedText);
        })
    });
});