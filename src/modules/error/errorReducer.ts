import {
  API_ERROR,
  CLEAR_API_ERROR,
  RESET_ERROR_COUNT,
  SET_ERROR_COUNT
} from './errorConstants';

import IErrorState from '../../interfaces/IErrorState';
import IReduxAction from '../../interfaces/IReduxAction';

const defaultErrorState: IErrorState = {
  errorCount: 0,
  errorMsg: '',
  isError: false
};

export const errorReducer = (
  state = defaultErrorState,
  action: IReduxAction
) => {
  switch (action.type) {
    case API_ERROR:
      return { ...state, isError: true, errorMsg: action.payload };

    case CLEAR_API_ERROR:
      return { ...state, isError: false, errorMsg: '' };

    case RESET_ERROR_COUNT:
      return { ...state, errorCount: 0, errorMsg: action.payload };

    case SET_ERROR_COUNT:
      return {
        ...state,
        errorCount: state.errorCount + 1,
        errorMsg: action.payload
      };

    default:
      return state;
  }
};
