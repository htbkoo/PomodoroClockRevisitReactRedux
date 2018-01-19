// @flow
const mockAll = (modules: Array<string>) => modules.forEach(module => jest.mock(module));

export {mockAll}