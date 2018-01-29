// @flow

import React from "react";

import {TimeTickerComponent} from "./TimeTicker";
import {mount} from "enzyme";
import {NO_OP} from "../utils/functionUtil";

jest.useFakeTimers();

describe('TimeTicker - mount test', function () {
    describe("TimeTickerComponent", function () {
        it('should call onTimeTick(props.interval) per props.interval when props.isCounting=true', function () {
            //    given
            const spyOnTimeTick = jest.fn(), interval = 100, difference = 1, isCounting = true, someTime = 10000;

            //    when
            mount(<TimeTickerComponent isCounting={isCounting} interval={interval} time={someTime}
                                       onTimeTick={spyOnTimeTick} onTimesUp={NO_OP} nextDuration={0}/>);

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

        it('should never call onTimeTick(props.interval) when props.isCounting=false', function () {
            //    given
            const spyOnTimeTick = jest.fn(), interval = 100, isCounting = false, someTime = 10000;

            //    when
            mount(<TimeTickerComponent isCounting={isCounting} interval={interval} time={someTime}
                                       onTimeTick={spyOnTimeTick} onTimesUp={NO_OP} nextDuration={0}/>);

            //    then
            expect(spyOnTimeTick).toHaveBeenCalledTimes(0);

            jest.runTimersToTime(interval);
            expect(spyOnTimeTick).toHaveBeenCalledTimes(0);

            jest.runTimersToTime(interval * 10);
            expect(spyOnTimeTick).toHaveBeenCalledTimes(0);
        });

        it('should call props.onTimesUp(props.nextDuration) when isCounting=true and props.time <= props.interval', function () {
            //    given
            const spyOnTimeTick = jest.fn(), spyOnTimesUp = jest.fn(), interval = 100, isCounting = true,
                nextDuration = 10000;

            //    when
            mount(<TimeTickerComponent isCounting={isCounting} interval={interval} time={interval}
                                       onTimeTick={spyOnTimeTick} onTimesUp={spyOnTimesUp}
                                       nextDuration={nextDuration}/>);
            expect(spyOnTimesUp).toHaveBeenCalledTimes(0);
            jest.runTimersToTime(interval);

            //    then
            expect(spyOnTimesUp).toHaveBeenCalledTimes(1);
            expect(spyOnTimesUp).toHaveBeenCalledWith(nextDuration);
            expect(spyOnTimeTick).toHaveBeenCalledTimes(0);
        });

        it('should never call props.onTimesUp() when isCounting=false', function () {
            //    given
            const spyOnTimeTick = jest.fn(), spyOnTimesUp = jest.fn(), interval = 100, isCounting = false;

            //    when
            mount(<TimeTickerComponent isCounting={isCounting} interval={interval} time={interval}
                                       onTimeTick={spyOnTimeTick} onTimesUp={spyOnTimesUp} nextDuration={0}/>);
            expect(spyOnTimesUp).toHaveBeenCalledTimes(0);
            jest.runTimersToTime(interval);

            //    then
            expect(spyOnTimesUp).toHaveBeenCalledTimes(0);
            expect(spyOnTimeTick).toHaveBeenCalledTimes(0);
        });
    });
});