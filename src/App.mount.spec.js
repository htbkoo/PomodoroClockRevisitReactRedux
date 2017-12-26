// @flow
import React from 'react';
import {mount} from "enzyme";

import App from './App';

describe('App - mount test', function () {
    it('renders without crashing', () => {
        mount(<App/>);
    });

    it('should be able to display default time', function () {
        // given
        const DEFAULT_TIME = "25m 00s 000";

        // when
        let app = mount(<App/>);
        let clockTime = app.find("#clock-time");

        // then
        expect(clockTime).toIncludeText(DEFAULT_TIME)
    });
});