// @flow

import * as objectUtil from "./objectUtil";
import {NO_OP} from "./functionUtil";

describe("objectUtil", function () {
    describe("isDefined", function () {
        [
            {value: "someString", expected: true},
            {value: 1, expected: true},
            {value: {}, expected: true},
            {value: [], expected: true},
            {value: NO_OP, expected: true},
            {value: true, expected: true},
            {value: false, expected: true},
            {value: undefined, expected: false}
        ].forEach(({expected, value}) =>
            it(`should return ${expected.toString()} for "${String(value)}"`, function () {
                //    given
                //    when
                let actual = objectUtil.isDefined(value);

                //    then
                expect(actual).toEqual(expected);
            })
        );
    });
});