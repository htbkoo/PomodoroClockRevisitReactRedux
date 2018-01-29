// @flow

import type {ClockId, Clocks} from "../../redux/state";

export default {
    getNextDuration(clocks: Clocks, sessionClockId: ClockId): number {
        let allIds = clocks.allIds;
        let index = allIds.indexOf(sessionClockId);
        let nextClockId = allIds[index + 1];
        return clocks.byId[nextClockId].duration;
    }
}