// @flow
import {startCounting, pauseCounting, stopCounting, tickTime, timesUp} from "./actions";

describe('actions', function () {
    [
        {
            testPurpose: "to start counting",
            expectedAction: {type: "StartCounting"},
            actualAction: startCounting()
        }
    ].forEach(({testPurpose, expectedAction, actualAction}) =>
        it(`should create an action ${testPurpose}`, function () {
            expect(actualAction).toEqual(expectedAction);
        })
    );

    it('should create an action to pause counting', function () {
        //    given
        const expectedAction = {type: "PauseCounting"};

        //    when
        let actualAction = pauseCounting();

        //    then
        expect(actualAction).toEqual(expectedAction);
    });

    it('should create an action to stop counting', function () {
        //    given
        const expectedAction = {type: "StopCounting"};

        //    when
        let actualAction = stopCounting();

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

    it('should create an action for times up', function () {
        //    given
        const expectedAction = {type: "TimesUp"};

        //    when
        let actualAction = timesUp();

        //    then
        expect(actualAction).toEqual(expectedAction);
    });
});