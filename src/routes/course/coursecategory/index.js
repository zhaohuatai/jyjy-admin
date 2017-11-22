import React, {Component} from 'react';
import {Pagination, Table, Tabs} from 'antd';
import Filter from './Filter';
import Update from './Update';
import Detail from './Detail';
import {loadServiceCourseCategory, loadServiceCourseCategoryDataSet, deleteServiceCourseCategory} from "../../../service/course";
import New from "./New";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '课程名', dataIndex: 'name', key: 'name'},
  {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
  {title: '修改时间', dataIndex: 'updateTime', key: 'updateTime'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
  {title: '显示顺序', dataIndex: 'showIndex', key: 'showIndex'},

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
      recycle_data: false,
    };
  }

  componentDidMount() {
    this.handleRefresh({status: '1'});
  }

  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    loadServiceCourseCategoryDataSet(params).then(data => {
      this.setState({course: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
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
    searchForm.page = currentPage;
    this.handleRefresh(searchForm)
  }

  // 搜索
  handleSearch = (values) => {
    this.setState({table_cur_page: 1});
    values['status'] = (this.state.recycle_data ? 2 : 1);
    this.handleRefresh(values);
  }

  // 更新
  handleUpdate = () => {
    loadServiceCourseCategory({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.serviceCourseCategory, update_display: true})
    })
  }

  //删除
  handleDelete = () => {
    deleteServiceCourseCategory({id: this.state.selectedRowKeys[0]}).then(data => {
      this.handleRefresh({status: 1});
    })
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadServiceCourseCategory({id: record.id}).then(data => {
      this.setState({detail_data: data.data.serviceCourseCategory, detail_display: true})
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
          <TabPane tab="课程列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {this.handleRefresh({page: this.state.table_cur_page, status: '2'}); this.setState({recycle_data: true})}}
              doUpdate={this.handleUpdate}
              doDelete={this.handleDelete}

            />
            <Table
              dataSource={this.state.course}
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
