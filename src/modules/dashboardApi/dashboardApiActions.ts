import { handleError } from '../error/errorActions';
import {
  SET_CHART_DATA,
  SET_CHART_DATA_LOADING_STATUS,
  SET_CHART_DETAIL_DATA,
  SET_CHART_DETAIL_DATA_LOADING_STATUS
} from './dashboardApiConstants';

export const requestChartData = () => {
  return (dispatch: any) => {
    dispatch(setChartDataLoadingStatus());
    const errorMessage = `Service unavailable: Cannot get data for Chart.`;
    return fetch(`${process.env.PUBLIC_URL}/json/mockdata.json`)
      .then(
        (res) => {
          if (res.status !== 200) {
            console.warn('-----requestChartData() error-----');
            dispatch(handleError(errorMessage));
          }
          return res.json();
        },
        (error) => dispatch(handleError(errorMessage))
      )
      .then((data) => {
        dispatch(setChartData(data));
      });
  };
};

export const setChartData = (data: any[]) => {
  return {
    type: SET_CHART_DATA,
    payload: data
  };
};

export const setChartDataLoadingStatus = () => {
  return {
    type: SET_CHART_DATA_LOADING_STATUS
  };
};

export const requestChartTableDetailData = (college: string, code: string) => {
  return (dispatch: any) => {
    console.log('requestChartTableDetailData', college, code);
    dispatch(setChartDetailData([]));
    dispatch(setChartDetailDataLoadingStatus());
    const errorMessage = `Service unavailable: Cannot get data for Table Detail.`;

    return fetch(
      `${process.env.PUBLIC_URL}/json/detail-${college}-${code}-Data.json`
    )
      .then(
        (res) => {
          if (res.status !== 200) {
            console.warn('-----requestChartTableDetailData() error-----');
            dispatch(handleError(errorMessage));
          } else {
            if (college !== 'A' || code !== 'less3') {
              //manual check the mpck api, can change it when pint to real api
              dispatch(handleError(errorMessage));
            } else {
              console.log(res, 'res');
              return res.json();
            }
          }
        },
        (error) => dispatch(handleError(errorMessage))
      )
      .then((data) => {
        console.log('setChartDetailData', data);
        if (data) {
          dispatch(setChartDetailData(data));
        } else {
          dispatch(setChartDetailData([]));
        }
      });
  };
};

export const setChartDetailData = (data: any[]) => {
  return {
    type: SET_CHART_DETAIL_DATA,
    payload: data
  };
};

export const setChartDetailDataLoadingStatus = () => {
  return {
    type: SET_CHART_DETAIL_DATA_LOADING_STATUS
  };
};
