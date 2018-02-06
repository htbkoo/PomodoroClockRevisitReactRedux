// @flow

import {StateBuilder} from "../../testUtils/StateBuilder";
import clocksHelper from "./clocksHelper";

describe('clocksHelper', function () {
    describe('getNextDuration', function () {
        it('should return the next clockId if the sessionClockId is not the last', function () {
            // given
            const sessionClockId = "1";
            const nextClock = {id: "2", duration: 200};
            const clocks = new StateBuilder()
                .addClock({id: sessionClockId, duration: 1})
                .addClock(nextClock)
                .build().clocks;

            // when
            let actualNextClock = clocksHelper.getNextDuration(clocks, sessionClockId);

            // then
            expect(actualNextClock).toEqual(nextClock);
        });

        it('should return the first clockId if the sessionClockId is the last', function () {
            // given
            const sessionClockId = "2";
            const nextClock = {id: "1", duration: 100};
            const clocks = new StateBuilder()
                .addClock(nextClock)
                .addClock({id: sessionClockId, duration: 2})
                .build().clocks;

            // when
            let actualNextClock = clocksHelper.getNextDuration(clocks, sessionClockId);

            // then
            expect(actualNextClock).toEqual(nextClock);
        });

        it('should return the first clockId if there is only one clock', function () {
            // given
            const sessionClockId = "1";
            let nextClock = {id: sessionClockId, duration: 100};
            const clocks = new StateBuilder()
                .addClock(nextClock)
                .build().clocks;

            // when
            let actualNextClock = clocksHelper.getNextDuration(clocks, sessionClockId);

            // then
            expect(actualNextClock).toEqual(nextClock);
        });

        describe('exception cases', function () {
            // Todo: improve
            it('should return undefined if there are no clocks', function () {
                // given
                const sessionClockId = "";
                const clocks = new StateBuilder().build().clocks;

                // when
                let actualNextClock = clocksHelper.getNextDuration(clocks, sessionClockId);

                // then
                expect(actualNextClock).toEqual(undefined);
            });
        });
    });
});