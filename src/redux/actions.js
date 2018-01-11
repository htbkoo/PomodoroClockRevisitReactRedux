// @flow
// Unfortunately flow type canNOT refer to variable, even if they are constants, so duplication is inevitable
// Reference: https://stackoverflow.com/a/42202467
export type StartCountingAction = { type: "StartCounting" };
export type PauseCountingAction = { type: "PauseCounting" };
export type TickTimeAction = { type: "TickTime", lapse: number };

export type Action =
    | StartCountingAction
    | PauseCountingAction
    | TickTimeAction;

export const actionTypes = {
    StartCounting: "StartCounting",
    PauseCounting: "PauseCounting",
    TickTime: "TickTime"
};

export function startCounting(): StartCountingAction {
    return {type: actionTypes.StartCounting};
}

export function pauseCounting(): PauseCountingAction {
    return {type: actionTypes.PauseCounting};
}

export function tickTime(lapse: number): TickTimeAction {
    return {type: actionTypes.TickTime, lapse};
}