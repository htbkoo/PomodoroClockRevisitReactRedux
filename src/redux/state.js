// @flow

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

type Interval = number;

export type State = $ReadOnly<{
    +interval: Interval,
    +session: Session,
    +clocks: Clocks
}>;

export class StateBuilder {
    +withTime: (time: number) => StateBuilder;
    +getTime: () => number;
    +withIsCounting: (isCounting: boolean) => StateBuilder;
    +getIsCounting: () => boolean;
    +withInterval: (interval: Interval) => StateBuilder;
    +getInterval: () => Interval;
    +withOriginalTime: (originalTime: number) => StateBuilder;
    +getOriginalTime: () => number;
    +withSessionClockId: (clockId: ClockId) => StateBuilder;
    +getSessionClockId: () => ClockId;
    +addClock: (clock: WithClockId) => StateBuilder;
    +getClocks: () => Clocks;

    constructor() {
        let _time = 0, _isCounting = false, _interval: number = 0, _originalTime = 0, _sessionClockId = "0",
            _clocks = {byId: {}, allIds: []};
        this.withTime = time => {
            _time = time;
            return this;
        };
        this.getTime = () => _time;

        this.withIsCounting = isCounting => {
            _isCounting = isCounting;
            return this;
        };
        this.getIsCounting = () => _isCounting;

        this.withInterval = interval => {
            _interval = interval;
            return this;
        };
        this.getInterval = () => _interval;

        this.withOriginalTime = originalTime => {
            _originalTime = originalTime;
            return this;
        };
        this.getOriginalTime = () => _originalTime;

        this.withSessionClockId = sessionClockId => {
            _sessionClockId = sessionClockId;
            return this;
        };
        this.getSessionClockId = () => _sessionClockId;

        this.addClock = clock => {
            _clocks.byId[clock.id] = clock;
            _clocks.allIds.push(clock.id);
            return this;
        };
        this.getClocks = () => _clocks;
    }

    build(): State {
        return {
            interval: this.getInterval(),
            session: {
                isCounting: this.getIsCounting(),
                time: this.getTime(),
                originalTime: this.getOriginalTime(),
                clockId: this.getSessionClockId()
            },
            clocks: this.getClocks()
        }
    }
}

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