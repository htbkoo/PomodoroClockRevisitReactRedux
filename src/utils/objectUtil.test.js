// @flow

import * as objectUtil from "./objectUtil";

describe("objectUtil", function () {
    describe("isDefined", function () {
        [
            {expected: true, value: "someString"}
        ].forEach(({expected, value}) =>
            it(`should return ${expected.toString()} for "${value}"`, function () {
                //    given
                //    when
                let actual = objectUtil.isDefined(value);

                //    then
                expect(actual).toEqual(expected);
            })
        );
    });
});