import type {Clock, ClockId, Interval, State, WithClockId} from "../redux/state";

import mergeOptions from "merge-options";

const emptyState = {
    interval: 0,
    session: {
        isCounting: false,
        time: 0,
        clockId: "0"
    },
    clocks: {
        byId: {},
        allIds: []
    }
};

export class StateBuilder {
    +withTime: (time: number) => StateBuilder;
    +withIsCounting: (isCounting: boolean) => StateBuilder;
    +withInterval: (interval: Interval) => StateBuilder;
    +withOriginalTime: (originalTime: number) => StateBuilder;
    +withSessionClockId: (clockId: ClockId) => StateBuilder;
    +addClock: (clock: WithClockId) => StateBuilder;

    static baseOn(state: State): StateBuilder {
        return new StateBuilder(state);
    }

    static builderWithClocks(clocks: $ReadOnlyArray<Clock>): StateBuilder {
        console.log(clocks);
        const startWithNewBuilder = new StateBuilder();
        return clocks.reduce((builder, clock) => builder.addClock(clock), startWithNewBuilder);
    }


    constructor(state: State = emptyState) {
        let _state = mergeOptions(state);
        this.withTime = time => {
            _state.session.time = time;
            return this;
        };

        this.withIsCounting = isCounting => {
            _state.session.isCounting = isCounting;
            return this;
        };

        this.withInterval = interval => {
            _state.interval = interval;
            return this;
        };

        this.withOriginalTime = originalTime => {
            _state.session.originalTime = originalTime;
            return this;
        };

        this.withSessionClockId = sessionClockId => {
            _state.session.clockId = sessionClockId;
            return this;
        };

        this.addClock = clock => {
            _state.clocks.byId[clock.id] = clock;
            _state.clocks.allIds.push(clock.id);
            return this;
        };

        this.build = (): State => mergeOptions(_state);
    }
}

// Simple mock clock so need to fake the flow type
//$FlowFixMe
// IntelliJ bug - for sure this function is in use (e.g. ClocksList.test.js) but it failed to detect this
// noinspection JSUnusedGlobalSymbols
export function mockClock(id): Clock {
    return {id: id,};
}