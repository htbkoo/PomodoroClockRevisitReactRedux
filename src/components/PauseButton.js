// @flow
import React from "react";
import {pauseCounting} from "../redux/actions";

export const mapDispatchToProps = (dispatch: Function) => ({
    onPauseClick() {
        dispatch(pauseCounting());
    }
});
