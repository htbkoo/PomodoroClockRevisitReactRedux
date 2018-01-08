// @flow

import {mapStateToProps, mapDispatchToProps} from "./TimeTicker";
import {StateBuilder} from "../redux/state";
import {tickTime} from "../redux/actions";

describe('TimeTicker', function () {
    describe("mapStateToProps", function () {
        [
            true,
            false
        ].forEach(isCounting =>
            it(`should mapStateToProps which props={isCounting: ${String(isCounting)}}`, function () {
                //    given
                const interval = 100;
                const state = new StateBuilder().withIsCounting(isCounting).withInterval(interval).build();

                //    when
                let props = mapStateToProps(state);

                //    then
                expect(props).toEqual({isCounting, interval});
            })
        );
    });

    describe("mapDispatchToProps", function () {
        it(`should mapDispatchToProps`, function () {
            //    given
            const spyDispatch = jest.fn(), someLapse = 100;

            //    when
            let props = mapDispatchToProps(spyDispatch);
            props.onTimeTick(someLapse);

            //    then
            expect(spyDispatch).toHaveBeenCalledWith(tickTime(someLapse));
        });
    });
});