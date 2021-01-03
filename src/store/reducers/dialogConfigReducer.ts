import { createReducer } from "../../utils/createReducer";
import { DialogConfigState } from "../types";

import { DialogConfigActions, SET_DIALOG_CONFIG } from "../actions/types";

const initialState = {
  firstStepId: undefined,
  script: {},
};

const dialogConfigReducer = {
  [SET_DIALOG_CONFIG]: (state: DialogConfigState, { config: { script, firstStepId } }) => {
    return {
      ...state,
      firstStepId,
      script,
    };
  },
};

export default (state: DialogConfigState = initialState, action: DialogConfigActions) =>
  createReducer(dialogConfigReducer, state, action);
