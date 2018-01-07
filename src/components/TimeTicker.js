// @flow
import type {State} from "../redux/state";

type Props = {
    +isCounting: boolean,
}

export const mapStateToProps = (state: State): Props => ({isCounting: state.isCounting});
export const mapDispatchToProps = (dispatch: Function) => ({});
