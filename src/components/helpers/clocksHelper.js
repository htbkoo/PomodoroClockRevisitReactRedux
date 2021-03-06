// @flow

import type {Clock, ClockId, Clocks} from "../../redux/state";

export default {
    getNextDuration(clocks: Clocks, sessionClockId: ClockId): Clock {
        let allIds = clocks.allIds;
        let index = allIds.indexOf(sessionClockId);
        let isLastClock = (index === allIds.length - 1);
        let nextClockId = isLastClock ? allIds[0] : allIds[index + 1];
        return clocks.byId[nextClockId];
    }
}