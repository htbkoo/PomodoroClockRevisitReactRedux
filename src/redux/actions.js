// @flow
import type {Clock, ClockId} from "./state";

type ClockConfig = {};

// Unfortunately flow type canNOT refer to variable, even if they are constants, so duplication is inevitable (cannot refer to actionTypes)
// Reference: https://stackoverflow.com/a/42202467
export type StartCountingAction = { type: "StartCounting" };
export type PauseCountingAction = { type: "PauseCounting" };
export type StopCountingAction = { type: "StopCounting", originalTime: number };
export type TickTimeAction = { type: "TickTime", lapse: number };
export type TimesUpAction = { type: "TimesUp", nextClock: Clock };
export type UpdateClockConfigAction = { type: "UpdateClockConfig", id: ClockId, updatedConfig: ClockConfig };

export type Action =
    | StartCountingAction
    | PauseCountingAction
    | StopCountingAction
    | TickTimeAction
    | TimesUpAction
    | UpdateClockConfigAction;

export type Dispatch = (Action) => void;

export const actionTypes = {
    StartCounting: "StartCounting",
    PauseCounting: "PauseCounting",
    StopCounting: "StopCounting",
    TickTime: "TickTime",
    TimesUp: "TimesUp",
    UpdateClockConfig: "UpdateClockConfig",
};

export function startCounting(): StartCountingAction {
    return {type: actionTypes.StartCounting};
}

export function pauseCounting(): PauseCountingAction {
    return {type: actionTypes.PauseCounting};
}

export function stopCounting(originalTime: number): StopCountingAction {
    return {type: actionTypes.StopCounting, originalTime};
}

export function tickTime(lapse: number): TickTimeAction {
    return {type: actionTypes.TickTime, lapse};
}

export function timesUp(nextClock: Clock): TimesUpAction {
    return {type: actionTypes.TimesUp, nextClock};
}

export function updateClockConfig(id: ClockId, updatedConfig: ClockConfig): UpdateClockConfigAction {
    return {type: actionTypes.UpdateClockConfig, id, updatedConfig};
}