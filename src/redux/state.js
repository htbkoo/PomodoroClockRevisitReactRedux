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
    +session: Session,
    +clocks: Array<{
        +clock: Clock
    }>
};

export class StateBuilder {
    withTime: Function;
    getTime: Function;
    withIsCounting: Function;
    getIsCounting: Function;

    constructor() {
        let _time = 0, _isCounting = false;
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
    }

    build(): State {
        return {
            isCounting: this.getIsCounting(),
            session: {
                time: this.getTime(),
                clockId: 0
            },
            clocks: []
        }
    }
}