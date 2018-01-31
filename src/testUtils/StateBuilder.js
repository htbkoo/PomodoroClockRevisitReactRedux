import type {ClockId, Clocks, Interval, State, WithClockId} from "../redux/state";

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