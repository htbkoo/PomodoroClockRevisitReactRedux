// @flow
import React from "react";
import {stopCounting} from "../redux/actions";
import SimpleButton from "./highOrderComponents/SimpleButton";

type Props = {
    +originalTime: number;
}

// Untested
export default (props: Props): React$Element<any> => (
    <SimpleButton action={stopCounting(props.originalTime)} buttonId="btn_stop"/>
);
