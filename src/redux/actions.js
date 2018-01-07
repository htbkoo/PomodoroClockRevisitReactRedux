// @flow
export const StartCountingAction = { type: "StartCounting" };

export type Action =
    | typeof StartCountingAction;

export function startCounting(): typeof StartCountingAction {
    return StartCountingAction;
}