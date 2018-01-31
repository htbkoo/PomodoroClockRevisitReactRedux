// @flow

import {StateBuilder} from "../testUtils/StateBuilder";

export type Session = $ReadOnly<{
    +time: number,
    +originalTime: number,
    +clockId: ClockId,
    +isCounting: boolean,
}>;

export type ClockId = string;

export type WithClockId = {
    +id: ClockId
};

export type Clock = $ReadOnly<{
    +id: ClockId,
    +duration: number,
    +name: string,
    +colour: string
}>;

export type Clocks = $ReadOnly<{
    +byId: $ReadOnly<{
        [ClockId]: Clock
    }>,
    allIds: $ReadOnlyArray<ClockId>
}>;

export type Interval = number;

export type State = $ReadOnly<{
    +interval: Interval,
    +session: Session,
    +clocks: Clocks
}>;

const pomodoroClock = {
    id: "1",
    duration: 1500000,
    name: "pomodoro",
    colour: "red"
}, breakClock = {
    id: "2",
    duration: 300000,
    name: "break",
    colour: "green"
};

export const newInitialStateBuilder = (): StateBuilder => new StateBuilder().withTime(1500000).withOriginalTime(1500000).withInterval(100)
    .addClock(pomodoroClock)
    .addClock(breakClock);

export const newInitialState = (): State => ({
    interval: 100,
    session: {
        isCounting: false,
        time: 1500000,
        originalTime: 1500000,
        clockId: "0"
    },
    clocks: {
        byId: {
            "1": {
                id: "1",
                duration: 1500000,
                name: "pomodoro",
                colour: "red"
            },
            "2": {
                id: "2",
                duration: 300000,
                name: "break",
                colour: "green"
            }
        },
        allIds: ["1", "2"]
    }
});