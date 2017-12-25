// @flow

export type Session = {
    time: number,
    clockId: number
};

export type Clock = {
    id: number,
    duration: number,
    name: string,
    colour: string
};

export type State = {
    isCounting: boolean,
    session: Session,
    clocks: Array<Clock>
};