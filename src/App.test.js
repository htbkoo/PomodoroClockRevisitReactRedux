// @flow

import React from "react";
import {shallow} from "enzyme";

import App from "./App";

import Clock from "./components/Clock";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";

describe('App', function () {
    it('should have a <Clock/> when rendered', function () {
        //    given
        //    when
        let app = shallow(<App/>);

        //    then
        expect(app.find(Clock)).toHaveLength(1);
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