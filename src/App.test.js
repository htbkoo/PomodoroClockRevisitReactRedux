// @flow

import React from "react";
import {shallow} from "enzyme";

import App, {mapStateToProps} from "./App";

import Timer from "./components/Timer";
import ButtonsPanel from "./components/ButtonsPanel";
import TimeTicker from "./components/TimeTicker";
import ClocksList from "./components/ClocksList";
import {StateBuilder} from "./testUtils/StateBuilder";

describe('App', function () {
    describe('mapStateToProps', function () {
        it('should mapStateToProps', function () {
            //    given
            const isCounting = true;
            const state = new StateBuilder().withIsCounting(isCounting).build();

            //    when
            let props = mapStateToProps(state);

            //    then
            const expectedProps = {
                isCounting
            };
            expect(props).toEqual(expectedProps);
        });
    });

    describe('AppComponent', function () {
        describe('ClocksList', function () {
            it('should have a <ClocksList/> when rendered', function () {
                //    given
                //    when
                let app = shallow(<App isCounting={false}/>);

                //    then
                expect(app.find(ClocksList)).toHaveLength(1);
            });
        });

        describe('Session', function () {
            it('should have a <Timer/> when rendered', function () {
                //    given
                //    when
                let app = shallow(<App isCounting={false}/>);

                //    then
                expect(app.find(Timer)).toHaveLength(1);
            });

            it('should have a <ButtonsPanel/> when rendered', function () {
                //    given
                //    when
                let app = shallow(<App isCounting={false}/>);

                //    then
                expect(app.find(ButtonsPanel)).toHaveLength(1);
            });

            it('should have a <TimeTicker/> when props.isCounting=true', function () {
                //    given
                //    when
                let app = shallow(<App isCounting={true}/>);

                //    then
                expect(app.find(TimeTicker)).toHaveLength(1);
            });
        });
    });
});