// @flow

import React from "react";

import {TimeTickerComponent} from "./TimeTicker";
import {mount} from "enzyme";

jest.useFakeTimers();

describe('TimeTicker - mount test', function () {
    describe("TimeTickerComponent", function () {
        it('should call onTimeTick(props.interval) per props.interval when props.isCount=true', function () {
            //    given
            const spyOnTimeTick = jest.fn(), interval = 100, difference = 1;

            //    when
            mount(<TimeTickerComponent isCounting={true} onTimeTick={spyOnTimeTick} interval={interval}/>);

            //    then
            expect(spyOnTimeTick).toHaveBeenCalledTimes(0);

            jest.runTimersToTime(interval - difference);
            expect(spyOnTimeTick).toHaveBeenCalledTimes(0);

            jest.runTimersToTime(difference);
            expect(spyOnTimeTick).toHaveBeenCalledTimes(1);
            expect(spyOnTimeTick).toHaveBeenCalledWith(interval);

            jest.runTimersToTime(interval);
            expect(spyOnTimeTick).toHaveBeenCalledTimes(2);
            expect(spyOnTimeTick).toHaveBeenCalledWith(interval);
        });
    });
});