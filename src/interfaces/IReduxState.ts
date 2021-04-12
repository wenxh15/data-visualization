import IErrorState from './IErrorState';
import IDashboardApiState from './IDashboardApiState';

export default interface IReduxState {
  errorReducer: IErrorState;
  dashboardApiReducer: IDashboardApiState;
}
