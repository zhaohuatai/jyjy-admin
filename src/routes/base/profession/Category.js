import React, {Component} from 'react';
import {Form, Tabs} from 'antd';

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '专业名称', dataIndex: 'profession', key: 'profession'},
  {title: '专业代码', dataIndex: 'professionCode', key: 'professionCode'},
  {title: '所属学科', dataIndex: 'subjectName', key: 'subjectName'},
  {title: '所属门类', dataIndex: 'categoryName', key: 'categoryName'},
  {title: '修业年限', dataIndex: 'revisedYears', key: 'revisedYears'},
  {title: '授予学位', dataIndex: 'degree', key: 'degree'},
  {title: '毕业5年', dataIndex: 'salary', key: 'salary'},
  {
    title: '开设院校', dataIndex: 'offer', key: 'offer', render: (text) => {
    text = text.replace(/<.+\/>/g, ",");
    return text.length > 15 ? text.substr(0, 10) + "..." : text
  }
  },
  {title: '本科专业', dataIndex: 'undergradPro', key: 'undergradPro'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
]

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      table_loading: false,
      selectedRowKeys: [],
      table_cur_page: 1,
      table_total: 0,
      search_form: {},
      update_display: false,
      update_data: {},
      detail_display: false,
      detail_data: {},
      recycle_data: false,
    };
  }

  render() {
    const {table_loading, selectedRowKeys, table_cur_page, table_total} = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="专业列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {
                this.handleRefresh({status: this.state.recycle_data ? 1 : 2});
                this.setState({recycle_data: !this.state.recycle_data});
              }}
              doDelete={this.handleDelete}
              doUpdate={this.handleUpdate}
            />
            <Table
              dataSource={this.state.dataSet}
              columns={table_columns}
              pagination={false}
              rowKey={record => record.id + ''}
              loading={table_loading}
              bordered
              rowSelection={rowSelection}
              onRowClick={this.handleShowDetail}
            />
            <Pagination style={{marginTop: '10px'}} showQuickJumper defaultCurrent={1} current={table_cur_page}
                        defaultPageSize={20} total={table_total} onChange={this.onChangeTablePage}/>,
          </TabPane>
          <TabPane tab="新建" key="2">
            <New/>
          </TabPane>
          <TabPane tab="学科管理" key="3">
            <Subject/>
          </TabPane>
          <TabPane tab="门类管理" key="4">
            <Category/>
          </TabPane>
        </Tabs>
        <Update show={this.state.update_display} data={this.state.update_data}
                onCancel={() => this.setState({update_display: false})}/>
        <Detail show={this.state.detail_display} data={this.state.detail_data}
                onCancel={() => this.setState({detail_display: false})}/>
      </div>
    );
  }

}

export default Form.create()(Category);
