// @flow

import * as objectUtil from "./objectUtil";

describe("objectUtil", function () {
    describe("isDefined", function () {
        const expected = true, value = "someString";
        it(`should return ${expected.toString()} for "${value}"`, function () {
            //    given
            //    when
            let actual = objectUtil.isDefined(value);

            //    then
            expect(actual).toEqual(expected);
        });
    });
});