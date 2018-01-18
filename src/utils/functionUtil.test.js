// @flow

import * as functionUtil from "./functionUtil";

describe("functionUtil", function () {
    describe("NO_OP", function () {
        it("should export NO_OP as a function", function () {
            //    given
            //    when
            let no_op = functionUtil.NO_OP;

            //    then
            expect(no_op).toBeInstanceOf(Function);
            no_op();
        });
    });
});