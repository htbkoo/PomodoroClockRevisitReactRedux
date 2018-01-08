// @flow
import type {State} from "../redux/state";
import {tickTime} from "../redux/actions";

export const mapStateToProps = (state: State) => ({isCounting: state.isCounting});
export const mapDispatchToProps = (dispatch: Function) => ({
    onTimeTick(lapse: number) {
        dispatch(tickTime(lapse));
    }
});
