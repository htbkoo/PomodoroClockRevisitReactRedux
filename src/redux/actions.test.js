// @flow
import {startCounting} from "./actions";

describe('actions', function () {
    it('should create an action to start counting', function () {
        //    given
        const expectedAction = {type: "StartCounting"};

        //    when
        let actualAction = startCounting();

        //    then
        expect(actualAction).toEqual(expectedAction);
    });
});