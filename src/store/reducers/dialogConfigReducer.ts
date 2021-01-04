import { createReducer } from "../../utils/createReducer";
import { DialogConfigState, DialogActiveMessage } from "../types";

import { DialogConfigActions, SET_DIALOG_CONFIG, SET_DIALOG_ACTIVE_MESSAGE } from "../actions/types";

const initialState = {
  config: undefined,
  activeMessage: undefined,
};

const dialogConfigReducer = {
  [SET_DIALOG_CONFIG]: (state: DialogConfigState, { config: { script, firstStepId } }) => {
    return {
      ...state,
      config: {
        firstStepId,
        script,
      },
    };
  },
  [SET_DIALOG_ACTIVE_MESSAGE]: (state: DialogConfigState, { message }) => {
    return {
      ...state,
      activeMessage: message,
    };
  },
};

export default (state: DialogConfigState = initialState, action: DialogConfigActions) =>
  createReducer(dialogConfigReducer, state, action);
