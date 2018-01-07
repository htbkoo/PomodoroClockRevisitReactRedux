// @flow
type StartCountingAction = { type: "StartCounting" };

export type Action =
    | StartCountingAction;

export function startCounting(): StartCountingAction {
    return {type: "StartCounting"};
}