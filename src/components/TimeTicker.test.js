// @flow
import {sinonTest} from "../testUtils/sinonWithTest";

import {mapStateToProps, mapDispatchToProps} from "./TimeTicker";

import {mockClock, StateBuilder} from "../testUtils/StateBuilder";
import {tickTime, timesUp} from "../redux/actions";
import clocksHelper from "./helpers/clocksHelper";

describe('TimeTicker', function () {
    describe("mapStateToProps", function () {
        [
            true,
            false
        ].forEach(isCounting =>
            it(`should mapStateToProps which props={isCounting: ${String(isCounting)}, interval=100, time=1000}`, sinonTest(function () {
                //    given
                const interval = 100, time = 1000, sessionClockId = "someId", currentClock = mockClock(sessionClockId);
                const state = new StateBuilder().withIsCounting(isCounting).withInterval(interval).withTime(time)
                    .withSessionClockId(sessionClockId).addClock(currentClock)
                    .build();
                const nextClock = mockClock("2");
                this.stub(clocksHelper, "getNextDuration").withArgs(state.clocks, sessionClockId).returns(nextClock);

                //    when
                let props = mapStateToProps(state);

                //    then
                expect(props).toEqual({isCounting, interval, time, nextClock});
            }))
        );
    });

    describe("mapDispatchToProps", function () {
        it(`should mapDispatchToProps and have onTimeTick`, function () {
            //    given
            const spyDispatch = jest.fn(), someLapse = 100;

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onTimeTick(someLapse);

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(tickTime(someLapse));
        });

        it(`should mapDispatchToProps and have onTimesUp`, function () {
            //    given
            const spyDispatch = jest.fn(), nextClock = mockClock("100");

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onTimesUp(nextClock);

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(timesUp(nextClock));
        });
    });
});