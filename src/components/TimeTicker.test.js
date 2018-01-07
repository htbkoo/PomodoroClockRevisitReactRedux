// @flow

import {mapStateToProps} from "./TimeTicker";
import {StateBuilder} from "../redux/state";

describe('TimeTicker', function () {
    describe("mapStateToProps", function () {
        [
            true,
            false
        ].forEach(isCounting =>
            it(`should mapStateToProps which props={isCounting: ${String(isCounting)}}`, function () {
                //    given
                const state = new StateBuilder().withIsCounting(isCounting).build();

                //    when
                let props = mapStateToProps(state);

                //    then
                expect(props).toEqual({isCounting});
            })
        );
    });
});