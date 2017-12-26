// @flow
import React from 'react';
import {mount} from "enzyme";

import App from './App';

describe('App - mount test', function () {
    it('renders without crashing', () => {
        mount(<App/>);
    });
});