import React, { Component } from 'react';
import ReactTable from 'react-table';
import './react-table.css';

class Table extends Component {
  render() {
    return (
      <ReactTable
        data={this.props.tableData}
        columns={this.props.columns}
        showPagination={true}
        defaultPageSize={3}
      />
    );
  }
}

export default Table;
