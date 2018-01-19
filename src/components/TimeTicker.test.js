// @flow

import {mapStateToProps, mapDispatchToProps} from "./TimeTicker";
import {StateBuilder} from "../redux/state";
import {tickTime, timesUp} from "../redux/actions";

describe('TimeTicker', function () {
    describe("mapStateToProps", function () {
        [
            true,
            false
        ].forEach(isCounting =>
            it(`should mapStateToProps which props={isCounting: ${String(isCounting)}, interval=100, time=1000}`, function () {
                //    given
                const interval = 100, time = 1000;
                const state = new StateBuilder().withIsCounting(isCounting).withInterval(interval).withTime(time).build();

                //    when
                let props = mapStateToProps(state);

                //    then
                expect(props).toEqual({isCounting, interval, time});
            })
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
            const spyDispatch = jest.fn();

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onTimesUp();

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(timesUp());
        });
    });
});