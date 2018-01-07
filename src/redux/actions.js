// @flow
export const StartCountingAction = {type: "StartCounting"};
export type TickTimeAction = { type: "TickTime" };

export type Action =
    | typeof StartCountingAction
    | TickTimeAction;

export function startCounting(): typeof StartCountingAction {
    return StartCountingAction;
}

export function tickTime(lapse: number): TickTimeAction {
    return {type: "TickTime", lapse};
}