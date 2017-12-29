// @flow
import {List} from "immutable"

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
    +clocks: List<Clock>
};

export class StateBuilder {
    withTime: Function;
    getTime: Function;

    constructor() {
        let _time = 0;
        this.withTime = time => {
            _time = time;
            return this;
        };
        this.getTime = () => _time;
    }

    build(): State {
        return {
            isCounting: false,
            session: {
                time: this.getTime(),
                clockId: 0
            },
            clocks: List()
        }
    }
}