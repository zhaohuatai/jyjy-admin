import React, {Component} from 'react';
import {message, Pagination, Table, Tabs, Modal} from 'antd';
import Filter from './Filter';
import New from './New';
import Update from './Update';
import Detail from './Detail';
import {loadColumnChannel, loadColumnChannelItem, loadColumnChannelItemDataSet, deleteColumnChannelItem} from "../../../service/column";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '标题', dataIndex: 'title', key: 'title'},
  {title: '描述', dataIndex: 'hint', key: 'hint'},
  {title: '费用', dataIndex: 'freePay', key: 'freePay', render: (text) => text === 1 ? '收费' : '免费'},
  {title: '普通价格', dataIndex: 'price', key: 'price', rneder: text => text/100},
  {title: '会员价', dataIndex: 'priceVIP', key: 'priceVip', rneder: text => text/100},
  {title: '评论数', dataIndex: 'commentCount', key: 'commentCount'},
  {title: '排序', dataIndex: 'itemOrder', key: 'itemOrder'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
  {title: '状态', dataIndex: 'status', key: 'status', render: (text) => text === 1 ? '正常' : '删除'},
]

class School extends Component {
  // 删除记录
  handleDelete = () => {
    Modal.confirm({
      title: `确定删除吗？`,
      okType: 'danger',
      onOk: () => {
        deleteColumnChannelItem({id: this.state.selectedRowKeys[0]}).then(data => {
          message.success("删除成功！");
          this.handleRefresh(this.state.search_form);
        });
      }
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      slide: [],
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

  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadColumnChannelItemDataSet(params).then(data => {
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
    this.setState({table_cur_page: 1, search_form: values});
    this.handleRefresh(values);
  }

  componentDidMount() {
    this.handleRefresh();
  }

  // 更新
  handleUpdate = () => {
    loadColumnChannelItem({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.columnChannelItem, update_display: true})
    })
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadColumnChannel({id: record.channelId}).then(d => {
      loadColumnChannelItem({id: record.id}).then(data => {
        data.data.columnChannelItem['channel'] = d.title;
        this.setState({detail_data: data.data.columnChannelItem, detail_display: true})
      })
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
          <TabPane tab="期列表" key="1">
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
              onRowClick={this.handleShowDetail}
            />
            <Pagination style={{marginTop: '10px'}} showQuickJumper defaultCurrent={1} current={table_cur_page}
                        defaultPageSize={20} total={table_total} onChange={this.onChangeTablePage}/>,
          </TabPane>
          <TabPane tab="新建" key="2">
            <New/>
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

export default School;
