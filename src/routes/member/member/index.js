import React, {Component} from 'react';
import {message, Pagination, Table, Tabs} from 'antd';
import Detail from './Detail';
import Filter from './Filter';
import {loadServiceEntrance} from "../../../service/entrance";
import {loadMemberDataSet} from "../../../service/member";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '头像', dataIndex: 'profilePicture', key: 'profilePicture',  render: (text) => <img src={text} style={{height: '40px', width: '40px'}} /> },
  {title: '昵称', dataIndex: 'nickName', key: 'nickName',},
  {title: '姓名', dataIndex: 'name', key: 'name'},
  {title: '性别', dataIndex: 'sex', key: 'sex',  render: (text) => text === 1 ? '男' : '女'},
  {title: '余额', dataIndex: 'currentMoney', key: 'currentMoney'},
  {title: 'VIP级别', dataIndex: 'vipLevel', key: 'vipLevel'},
  {title: '电话', dataIndex: 'phone', key: 'phone'},
  {title: '学校', dataIndex: 'schoolName', key: 'schoolName'},
  {title: '年级', dataIndex: 'clazz', key: 'clazz'},
  {title: '邮箱', dataIndex: 'email', key: 'email'},
  {title: 'openid', dataIndex: 'openId', key: 'openId'},
  {title: '邀请码', dataIndex: 'invitationCode', key: 'invitationCode'},
  {title: '状态', dataIndex: 'status', key: 'status'},
  {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
]

class ServiceContent extends Component {
  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadMemberDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    }).catch((e) => {
      message.error(e);
    })
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

  componentDidMount() {
    this.handleRefresh();
  }

  // 更新
  handleUpdate = () => {
    loadServiceEntrance({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.serviceEntrance, update_display: true})
    })
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadServiceEntrance({id: record.id}).then(data => {
      this.setState({detail_data: data.data.serviceEntrance, detail_display: true})
    })
  }

  render() {
    const {table_loading, selectedRowKeys, table_cur_page, table_total} = this.state;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="会员列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {
                this.setState({recycle: !this.state.recycle}, () => {
                  this.handleRefresh();
                })
              }}
              doDelete={this.handleDelete}
              doUpdate={this.handleUpdate}
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
              // onRowClick={this.handleShowDetail}
            />
            <Pagination style={{marginTop: '10px'}} showQuickJumper defaultCurrent={1} current={table_cur_page}
                        defaultPageSize={20} total={table_total} onChange={this.onChangeTablePage}/>,
          </TabPane>
        </Tabs>

        <Detail show={this.state.detail_display} data={this.state.detail_data}
                onCancel={() => this.setState({detail_display: false})}/>
      </div>
    );
  }
}

export default ServiceContent;
