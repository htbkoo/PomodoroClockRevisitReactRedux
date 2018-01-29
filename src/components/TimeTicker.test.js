// @flow
import {sinonTest} from "../testUtils/sinonWithTest";

import {mapStateToProps, mapDispatchToProps} from "./TimeTicker";

import {StateBuilder} from "../redux/state";
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
                const interval = 100, time = 1000, sessionClockId = "someId", mockClock = {id: sessionClockId};
                const state = new StateBuilder().withIsCounting(isCounting).withInterval(interval).withTime(time)
                    .withSessionClockId(sessionClockId).addClock(mockClock)
                    .build();
                const nextDuration = 10000;
                this.stub(clocksHelper, "getNextDuration").withArgs(state.clocks, sessionClockId).returns(nextDuration);

                //    when
                let props = mapStateToProps(state);

                //    then
                expect(props).toEqual({isCounting, interval, time, nextDuration});
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
            const spyDispatch = jest.fn(), nextDuration = 100;

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onTimesUp(nextDuration);

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(timesUp(nextDuration));
        });
    });
});