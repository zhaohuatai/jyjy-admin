import React, {Component} from 'react';
import {message, Pagination, Table, Tabs} from 'antd';
import Filter from './Filter';
import Update from './Update';
import Detail from './Detail';
import {deleteColumnChannel, loadColumnChannel, loadColumnChannelDataSet} from "../../../service/column";
import New from "./New";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '专栏', dataIndex: 'title', key: 'title'},
  {title: '描述', dataIndex: 'hint', key: 'hint'},
  {title: '主讲人', dataIndex: 'presenterName', key: 'presenterName'},
  {title: '价格', dataIndex: 'price', key: 'price'},
  {title: '会员价格', dataIndex: 'priceVIP', key: 'priceVIP'},
  {title: '学习人数', dataIndex: 'learningCountActual', key: 'learningCountActual'},
  {title: '收藏数', dataIndex: 'favoriteCount', key: 'favoriteCount'},
  {title: '费用', dataIndex: 'freePay', key: 'freePay', render: (text) => text === 1 ? '收费' : '免费'},
  {title: '置顶', dataIndex: 'isTop', key: 'isTop', render: (text) => text === 1 ? '是' : '否'},
  {title: '分享积分', dataIndex: 'sharePoints', key: 'sharePoints'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
]

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      table_loading: false,
      selectedRowKeys: [],
      table_cur_page: 1,
      table_total: 0,
      search_form: {},
      update_display: false,
      update_data: {},
      detail_display: false,
      detail_data: {},
    };
  }

  //删除
  handleDelete = () => {
    confirm({
      title: `确定删除${this.state.dataSet[this.state.selectedRowkeys[0]].title}吗？`,
      okType: 'danger',
      onOk: () => {
        deleteColumnChannel({id: this.state.selectedRowKeys[0]}).then(data => {
          message.success("删除成功！");
          this.handleRefresh();
        });
      }
    })
  }

  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadColumnChannelDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
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

    this.handleRefresh(values)
  }

  // 更新
  handleUpdate = () => {
    loadColumnChannel({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.columnChannel, update_display: true})
    })
  }

  componentDidMount() {
    this.handleRefresh();
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadColumnChannel({id: record.id}).then(data => {
      this.setState({detail_data: data.data.columnChannel, detail_display: true})
    })
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
          <TabPane tab="专栏列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doUpdate={this.handleUpdate}
              doDelete={this.handleDelete}
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

export default Course;
