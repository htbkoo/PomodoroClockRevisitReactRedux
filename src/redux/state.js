// @flow

export type Session = {
    +time: number,
    +originalTime: number,
    +clockId: number,
    +isCounting: boolean,
};

export type Clock = {
    +id: number,
    +duration: number,
    +name: string,
    +colour: string
};

export type State = {
    +interval: number,
    +session: Session,
    +clocks: Array<{
        +clock: Clock
    }>
};

export class StateBuilder {
    +withTime: (time: number) => StateBuilder;
    +getTime: () => number;
    +withIsCounting: (isCounting: boolean) => StateBuilder;
    +getIsCounting: () => boolean;
    +withInterval: (interval: number) => StateBuilder;
    +getInterval: () => number;
    +withOriginalTime: (originalTime: number) => StateBuilder;
    +getOriginalTime: () => number;

    constructor() {
        let _time = 0, _isCounting = false, _interval: number = 0, _originalTime = 0;
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
            clocks: []
        }
    }
}