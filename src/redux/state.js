// @flow

export type ClockId = string;

export type Session = $ReadOnly<{
    +time: number,
    +clockId: ClockId,
    +isCounting: boolean,
}>;

export type WithClockId = {
    +id: ClockId
};

type WithDuration = {
    +duration: number
}

type WithName = {
    +name: string,
}

type WithColour = {
    +colour: string
}

export type Clock = $ReadOnly<WithClockId
    & WithDuration
    & WithName
    & WithColour>;

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

export const newInitialState = (): State => ({
    interval: 100,
    session: {
        isCounting: false,
        time: 1500000,
        clockId: "1"
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