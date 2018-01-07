// @flow

import {mapStateToProps} from "./TimeTicker";
import {StateBuilder} from "../redux/state";

describe('TimeTicker', function () {
    describe("mapStateToProps", function () {
        it("should mapStateToProps", function () {
            //    given
            const isCounting = true;
            const state = new StateBuilder().withIsCounting(isCounting).build();

            //    when
            let props = mapStateToProps(state);

            //    then
            expect(props).toEqual({isCounting});
        });
    });
});