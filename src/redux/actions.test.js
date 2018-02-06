// @flow
import {startCounting, pauseCounting, stopCounting, tickTime, timesUp} from "./actions";
import {mockClock} from "../testUtils/StateBuilder";

describe('actions', function () {
    const mockNextClock = mockClock("100");
    [
        {
            testPurpose: "an action to start counting",
            expectedAction: {type: "StartCounting"},
            actualAction: startCounting()
        },
        {
            testPurpose: "an action to pause counting",
            expectedAction: {type: "PauseCounting"},
            actualAction: pauseCounting()
        },
        {
            testPurpose: "an action to stop counting",
            expectedAction: {type: "StopCounting", originalTime: 300},
            actualAction: stopCounting(300)
        },
        {
            testPurpose: "an action to tick Time",
            expectedAction: {type: "TickTime", lapse: 100},
            actualAction: tickTime(100)
        },
        {
            testPurpose: "an action for times up",
            expectedAction: {type: "TimesUp", nextClock: mockNextClock},
            actualAction: timesUp(mockNextClock)
        }
    ].forEach(({testPurpose, expectedAction, actualAction}) =>
        it(`should create ${testPurpose}`, function () {
            expect(actualAction).toEqual(expectedAction);
        })
    );
});