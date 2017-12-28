// @flow
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import React from 'react';
import {mount} from "enzyme";

import App from './App';

describe('App - mount test', function () {
    const middlewares = [];
    const createMockStore = configureMockStore(middlewares);
    const store = createMockStore({session: {time: 1500000}});

    it('renders without crashing', () => {
        mount(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    });

    it('should be able to display default time', function () {
        // given
        const DEFAULT_TIME = "25m 00s 000";

        // when
        let app = mount(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        let clockTime = app.find("#clock-time");

        // then
        expect(clockTime).toIncludeText(DEFAULT_TIME)
    });
});