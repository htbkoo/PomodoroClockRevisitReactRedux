// @flow
import React from "react";
import {startCounting} from "../redux/actions";
import SimpleButton from "./highOrderComponents/SimpleButton";

// Untested
const StartButtonComponent = (): React$Element<any> => (
    <SimpleButton action={startCounting()} buttonId="btn_start"/>
);
export default StartButtonComponent;
