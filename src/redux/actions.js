// @flow
type StartCountingAction = { type: "StartCounting" };

type Action =
    | StartCountingAction;

export function startCounting(): StartCountingAction {
    return {type: "StartCounting"};
}