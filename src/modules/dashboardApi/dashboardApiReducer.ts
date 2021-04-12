import {
  SET_CHART_DATA,
  SET_CHART_DATA_LOADING_STATUS,
  SET_CHART_DETAIL_DATA,
  SET_CHART_DETAIL_DATA_LOADING_STATUS
} from './dashboardApiConstants';

import IDashboardApiState from '../../interfaces/IDashboardApiState';
import IReduxAction from '../../interfaces/IReduxAction';

const defaultDashboardApiState: IDashboardApiState = {
  data: [],
  isChartTableLoading: false,
  isLoading: false,
  tableData: []
};

export const dashboardApiReducer = (
  state = defaultDashboardApiState,
  action: IReduxAction
) => {
  switch (action.type) {
    case SET_CHART_DATA:
      return { ...state, isLoading: false, data: action.payload };

    case SET_CHART_DATA_LOADING_STATUS:
      return { ...state, isLoading: true };

    case SET_CHART_DETAIL_DATA:
      return {
        ...state,
        isChartTableLoading: false,
        tableData: action.payload
      };

    case SET_CHART_DETAIL_DATA_LOADING_STATUS:
      return { ...state, isChartTableLoading: true };

    default:
      return state;
  }
};
