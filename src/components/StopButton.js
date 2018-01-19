// @flow
import React from "react";
import {stopCounting} from "../redux/actions";
import SimpleButton from "./highOrderComponents/SimpleButton";

// Untested
export default (): React$Element<any> => (
    <SimpleButton action={stopCounting()} buttonId="btn_stop"/>
);
