import React, { Component } from 'react';
import IReduxState from '../../interfaces/IReduxState';
import { connect } from 'react-redux';
import './DashboardContainer.scss';
import { requestChartTableDetailData } from '../../modules/dashboardApi/dashboardApiActions';
import BarChart from '../../components/BarChart/BarChart';
import _ from 'lodash';
import Table from '../../components/Table/Table.js';
import Spinner from '../../components/Spinner/Spinner';

interface IDashboardContainerProps {
  requestChartTableDetailData(category: string, key: string): void;
  isChartTableLoading: boolean;
  tableData: any[];
}
class DashboardContainer extends Component<IDashboardContainerProps> {
  state = {
    showTable: false
  };

  handleClick = async (category: string, key: string) => {
    this.setState({ showTable: true });
    console.log(category, key, 'parent');

    let newKey = '';
    if (key === 'under 3') newKey = 'less3';
    if (key === '3 to 4') newKey = '3to4';
    if (key === 'over 4') newKey = 'over4';

    await this.props.requestChartTableDetailData(category, newKey);
  };

  renderSpinner = () => {
    return (
      <div className="spinner">
        <Spinner size={70} />
      </div>
    );
  };

  renderNoData = () => {
    return (
      <div className="loading-container">
        <p className="no-data-text">No data found</p>
      </div>
    );
  };

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      },
      {
        Header: 'GPA',
        accessor: 'gpa',
        Cell: (props: any) => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: 'college',
        accessor: 'college'
      }
    ];
    return (
      <article className="dashboard-container">
        <h2>Score Dashboard</h2>
        <p>This is a grouped bare chart example</p>
        <BarChart
          handleClick={(category: string, key: string) =>
            this.handleClick(category, key)
          }
        />
        <p>
          Only click college A under 3 bar chart trigger the table, others do
          not assosiate with mock data
        </p>
        {this.state.showTable &&
          (this.props.isChartTableLoading ? (
            this.renderSpinner()
          ) : this.props.tableData.length > 0 ? (
            <Table columns={columns} tableData={this.props.tableData || []} />
          ) : (
            this.renderNoData()
          ))}
      </article>
    );
  }
}
function mapStateToProps(state: IReduxState) {
  return {
    tableData: state.dashboardApiReducer.tableData,
    isChartTableLoading: state.dashboardApiReducer.isChartTableLoading
  };
}

export default connect(mapStateToProps, { requestChartTableDetailData })(
  DashboardContainer
);
