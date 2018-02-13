// @flow

import React from "react";
import {pauseCounting} from "../redux/actions";

import SimpleButton from "./highOrderComponents/SimpleButton";

// Untested
const PauseButtonComponent = (): React$Element<any> => (
    <SimpleButton action={pauseCounting()} buttonId="btn_pause"/>
);
export default PauseButtonComponent;
