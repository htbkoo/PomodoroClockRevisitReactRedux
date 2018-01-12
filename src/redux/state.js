// @flow

export type Session = {
    +time: number,
    +clockId: number
};

export type Clock = {
    +id: number,
    +duration: number,
    +name: string,
    +colour: string
};

export type State = {
    +isCounting: boolean,
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

    constructor() {
        let _time = 0, _isCounting = false, _interval: number = 0;
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
    }

    build(): State {
        return {
            interval: this.getInterval(),
            isCounting: this.getIsCounting(),
            session: {
                time: this.getTime(),
                clockId: 0
            },
            clocks: []
        }
    }
}