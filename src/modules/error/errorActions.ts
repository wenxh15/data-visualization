import {
  API_ERROR,
  CLEAR_API_ERROR,
  RESET_ERROR_COUNT,
  SET_ERROR_COUNT,
} from './errorConstants';

export const clearError = () => {
  return {
    type: CLEAR_API_ERROR,
  };
};

export const handleError = (errorMessage: string) => {
  return {
    type: API_ERROR,
    payload: errorMessage,
  };
};

export const incrementErrorCount = () => {
  return {
    type: SET_ERROR_COUNT,
  };
};

export const resetErrorCount = () => {
  return {
    type: RESET_ERROR_COUNT,
  };
};
