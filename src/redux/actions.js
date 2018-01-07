// @flow
// Unfortunately flow type canNOT refer to variable, even if they are constants, so duplication is inevitable
// Reference: https://stackoverflow.com/a/42202467
export type StartCountingAction = { type: "StartCounting" };
export type TickTimeAction = { type: "TickTime", lapse: number };

export type Action =
    | StartCountingAction
    | TickTimeAction;

export const actionTypes = {
    StartCounting: "StartCounting",
    TickTime: "TickTime"
};

export function startCounting(): StartCountingAction {
    return {type: actionTypes.StartCounting};
}

export function tickTime(lapse: number): TickTimeAction {
    return {type: actionTypes.TickTime, lapse};
}