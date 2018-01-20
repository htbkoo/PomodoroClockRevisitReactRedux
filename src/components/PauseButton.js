// @flow

import React from "react";
import {pauseCounting} from "../redux/actions";

import SimpleButton from "./highOrderComponents/SimpleButton";

// Untested
export default (): React$Element<any> => (
    <SimpleButton action={pauseCounting()} buttonId="btn_pause"/>
);