import React, {Component} from 'react';
import {Pagination, Table, Tabs} from 'antd';
import {deleteDataProfession, loadDataProfession, loadDataProfessionDataSet} from '../../../service/base';
import Filter from './Filter';
import New from './New';
import Update from './Update';
import Detail from './Detail';
import Subject from "./Subject";
import Category from "./Category";

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

class Profession extends Component {
  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    loadDataProfessionDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    })
  }

  // 删除记录
  handleDelete = () => {
    deleteDataProfession({id: this.state.selectedRowKeys[0]}).then(data => {
      this.handleRefresh({status: this.state.recycle_data ? 2 : 1});
    });
  }

  // 勾选记录
  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }
  // 切换页码
  onChangeTablePage = (currentPage) => {
    this.setState({table_loading: true, table_cur_page: currentPage});
    let searchForm = this.state.search_form;
    searchForm.page = currentPage;
    this.handleRefresh(searchForm)
  }

  componentDidMount() {
    this.handleRefresh({status: this.state.recycle_data ? 2 : 1});
  }

  // 搜索
  handleSearch = (values) => {
    this.setState({table_cur_page: 1});
    values['status'] = (this.state.recycle_data ? 2 : 1);
    this.handleRefresh(values);
  }
  // 更新
  handleUpdate = () => {
    loadDataProfession({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.dataProfession, update_display: true})
    })
  }
  // 显示详情
  handleShowDetail = (record) => {
    loadDataProfession({id: record.id}).then(data => {
      this.setState({detail_data: data.data.dataProfession, detail_display: true})
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
        <Tabs defaultActiveKey="3">
          <TabPane tab="专业列表" key="3">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {
                this.setState({recycle_data: !this.state.recycle_data});
                this.handleRefresh({status: this.state.recycle_data ? 2 : 1});
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
          <TabPane tab="新建" key="4">
            <New/>
          </TabPane>
          <TabPane tab="学科管理" key="1">
            <Subject/>
          </TabPane>
          <TabPane tab="门类管理" key="2">
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

export default Profession;
