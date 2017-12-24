// @flow

import React from "react";
import {shallow} from "enzyme";

import App from "./App";

import Clock from "./components/Clock";

describe('App', function () {
    it('should have a <Clock/> when rendered', function () {
        //    given
        //    when
        let app = shallow(<App/>);

        //    then
        expect(app).toContainReact(<Clock/>);
    });
});