import React from 'react';
import { Table } from 'antd';

const ListTable = () => {
  const cloumn = [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }];

  return (
    <Table
      dataSource={this.state.school}
      columns={cloumn}
      rowSelection={}
      size={}
      loading={}
      bordered={}
      onChange={}
      locale={}
      dropdownPrefixCls={}/>
  )
}

export default ListTable;