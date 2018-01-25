// @flow

export type Session = $ReadOnly<{
    +time: number,
    +originalTime: number,
    +clockId: number,
    +isCounting: boolean,
}>;

export type Clock = $ReadOnly<{
    +id: number,
    +duration: number,
    +name: string,
    +colour: string
}>;

export type Clocks = $ReadOnlyArray<Clock>;

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
    +addClock: (clock: any) => StateBuilder;
    +getClocks: () => $ReadOnlyArray<Clock>;

    constructor() {
        let _time = 0, _isCounting = false, _interval: number = 0, _originalTime = 0, _clocks = [];
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

        this.addClock = clock => {
            _clocks.push(clock);
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
                clockId: 0
            },
            clocks: this.getClocks()
        }
    }
}

export const newInitialStateBuilder = (): StateBuilder => new StateBuilder().withTime(1500000).withOriginalTime(1500000).withInterval(100);