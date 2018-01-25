// @flow

import React from "react";
import {shallow} from "enzyme";

import App from "./App";

import Timer from "./components/Timer";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";
import ClocksList from "./components/ClocksList";

describe('App', function () {
    describe('ClocksList', function () {
        it('should have a <ClocksList/> when rendered', function () {
            //    given
            //    when
            let app = shallow(<App/>);

            //    then
            expect(app.find(ClocksList)).toHaveLength(1);
        });
    });
    describe('Session', function () {
        it('should have a <Timer/> when rendered', function () {
            //    given
            //    when
            let app = shallow(<App/>);

            //    then
            expect(app.find(Timer)).toHaveLength(1);
        });

        it('should have a <ButtonsPanel/> when rendered', function () {
            //    given
            //    when
            let app = shallow(<App/>);

            //    then
            expect(app.find(ButtonsPanel)).toHaveLength(1);
        });

        it('should have a <TimeTicker/> when rendered', function () {
            //    given
            //    when
            let app = shallow(<App/>);

            //    then
            expect(app.find(TimeTicker)).toHaveLength(1);
        });
    });
});