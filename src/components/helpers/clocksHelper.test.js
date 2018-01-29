// @flow

import {StateBuilder} from "../../redux/state";
import clocksHelper from "./clocksHelper";

describe('clocksHelper', function () {
    describe('getNextDuration', function () {
        it('should return the next clockId if the sessionClockId is not the last', function () {
            // given
            const sessionClockId = "1", expectedNextDuration = 200;
            const clocks = new StateBuilder().addClock({id: sessionClockId, duration: 1}).addClock({id:"2", duration: expectedNextDuration}).build().clocks;

            // when
            let nextDuration = clocksHelper.getNextDuration(clocks, sessionClockId);

            // then
            expect(nextDuration).toEqual(expectedNextDuration);
        });
    });
});