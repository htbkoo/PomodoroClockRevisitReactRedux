// @flow
import {startCounting, tickTime, pauseCounting} from "./actions";

describe('actions', function () {
    it('should create an action to start counting', function () {
        //    given
        const expectedAction = {type: "StartCounting"};

        //    when
        let actualAction = startCounting();

        //    then
        expect(actualAction).toEqual(expectedAction);
    });

    it('should create an action to tick Time', function () {
        //    given
        const lapse = 100, expectedAction = {type: "TickTime", lapse};

        //    when
        let actualAction = tickTime(lapse);

        //    then
        expect(actualAction).toEqual(expectedAction);
    });

    it('should create an action to pause counting ', function () {
        //    given
        const expectedAction = {type: "PauseCounting"};

        //    when
        let actualAction = pauseCounting();

        //    then
        expect(actualAction).toEqual(expectedAction);
    });
});