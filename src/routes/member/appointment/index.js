import React, {Component} from 'react';
import {Button, message, Pagination, Table, Tabs} from 'antd';
import Filter from './Filter';
import Update from './Update';
import {loadMemberTeacherAppointmentDataSet} from "../../../service/member";

const TabPane = Tabs.TabPane;

class TeacherAppointment extends Component {

  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadMemberTeacherAppointmentDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    }).catch((e) => {
      message.error(e);
    })
  }

  // 勾选记录
  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }
  // 切换页码
  onChangeTablePage = (currentPage) => {
    this.setState({table_loading: true, table_cur_page: currentPage});
    let searchForm = this.state.search_form;
    searchForm['page'] = currentPage;
    this.handleRefresh(searchForm)
  }
  // 搜索
  handleSearch = (values) => {
    this.setState({table_cur_page: 1});
    this.handleRefresh(values);
  }

  // 更新
  handleReturnOver = (record) => {
    this.setState({update_data: record, update_display: true})
  }

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
      recycle: false,
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  render() {
    const {table_loading, selectedRowKeys, table_cur_page, table_total} = this.state;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const table_columns = [
      {title: '序号', dataIndex: 'id', key: 'id'},
      {title: '预约教师', dataIndex: 'teacher', key: 'teacher'},
      {title: '姓名', dataIndex: 'appointUserName', key: 'appointUserName'},
      {title: '电话', dataIndex: 'phone', key: 'phone'},
      {title: '其他信息', dataIndex: 'qq', key: 'qq'},
      {title: '会员ID', dataIndex: 'appointUserId', key: 'appointUserId', render: (text) => text ? text : "游客"},
      {title: '回访状态', dataIndex: 'returnStatus', key: 'returnStatus', render: (text) => text ? "已回访" : "未回访"},
      {title: '回访结果', dataIndex: 'returnResult', key: 'returnResult'},
      {title: '回访客服', dataIndex: 'returnServerId', key: 'returnServerId'},
      {
        title: '操作', key: 'action', render: (text, record) => {
        return record.returnStatus ? (
          <Button size='small' onClick={() => this.handleReturnOver(record)}>修改回访结果</Button>
        ) : (<Button type='primary' icon='check-circle-o' size='small'
                     onClick={() => this.handleReturnOver(record)}>回访完毕</Button>)
      }
      },
    ];

    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="预约管理" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {
                this.setState({recycle: !this.state.recycle}, () => {
                  this.handleRefresh();
                })
              }}
              recycle={this.state.recycle}
            />
            <Table
              dataSource={this.state.dataSet}
              columns={table_columns}
              pagination={false}
              rowKey={record => record.id + ''}
              loading={table_loading}
              bordered
              rowSelection={rowSelection}
              onRowClick={this.handleShowDetail}/>
            <Pagination style={{marginTop: '10px'}} showQuickJumper defaultCurrent={1} current={table_cur_page}
                        defaultPageSize={20} total={table_total} onChange={this.onChangeTablePage}/>,
          </TabPane>
        </Tabs>
        <Update show={this.state.update_display} data={this.state.update_data}
                onCancel={() => this.setState({update_display: false})}/>
      </div>
    );
  }
}

export default TeacherAppointment;
