// @flow

export function isDefinedAndNotNull(value: any) {
    return (typeof value !== "undefined") && (value !== null);
}