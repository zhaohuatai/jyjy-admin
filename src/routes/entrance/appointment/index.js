import React, {Component} from 'react';
import {message, Pagination, Table, Tabs} from 'antd';
import Filter from './Filter';
import Update from './Update';
import {
  deleteServiceEntrance,
  loadServiceEntrance,
  loadServiceEntranceAppointmentDataSet
} from "../../../service/entrance";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '名称', dataIndex: 'title', key: 'title'},
  {title: '栏目', dataIndex: 'cateName', key: 'cateName'},
  {title: '当前预约人数', dataIndex: 'appointCount', key: 'appointCount'},
  {title: '最大可预约数', dataIndex: 'maxAppointCount', key: 'maxAppointCount'},
  {title: '是否免费', dataIndex: 'freePay', key: 'freePay', render: (text) => text === 1 ? '收费' : '免费'},
  {title: '价格', dataIndex: 'price', key: 'price'},
  {title: '会员价格', dataIndex: 'priceVIP', key: 'priceVIP'},
  {title: '留言数', dataIndex: 'consultationCount', key: 'consultationCount'},
  {title: '收藏数', dataIndex: 'favoriteCount', key: 'favoriteCount'},
]

class Appointment extends Component {

  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadServiceEntranceAppointmentDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    }).catch((e) => {
      message.error(e);
    })
  }

  // 删除记录
  handleDelete = () => {
    confirm({
      title: `确定删除吗？`,
      okType: 'danger',
      onOk: () => {
        deleteServiceEntrance({id: this.state.selectedRowKeys[0]}).then(data => {
          message.success("删除成功！");
          this.handleRefresh();
        });
      }
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
  handleUpdate = () => {
    loadServiceEntrance({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.serviceEntrance, update_display: true})
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

export default Appointment;
