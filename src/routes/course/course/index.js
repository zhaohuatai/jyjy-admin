import React, {Component} from 'react';
import {message, Modal, Pagination, Table, Tabs} from 'antd';
import Filter from './Filter';
import Update from './Update';
import Detail from './Detail';
import {deleteServiceCourse, loadServiceCourse, loadServiceCourseDataSet} from "../../../service/course";
import New from "./New";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '课程名', dataIndex: 'name', key: 'name'},
  {title: '描述', dataIndex: 'hint', key: 'hint'},
  {title: '分类', dataIndex: 'categoryName', key: 'categoryName'},
  {title: '主讲人', dataIndex: 'presenterName', key: 'presenterName'},
  {title: '留言数', dataIndex: 'consultationCount', key: 'consultationCount'},
  {title: '收藏数', dataIndex: 'favoriteCount', key: 'favoriteCount'},
  {title: '实际学习人数', dataIndex: 'learningCountActual', key: 'learningCountActual'},
  {title: '费用', dataIndex: 'freePay', key: 'freePay', render: (text) => text === 1 ? '收费' : '免费'},
  {title: '置顶', dataIndex: 'isTop', key: 'isTop', render: (text) => text === 1 ? '是' : '否'},
  {title: '显示顺序', dataIndex: 'showIndex', key: 'showIndex'},
]

class Course extends Component {
  //删除

  handleDelete = () => {
    Modal.confirm({
      title: `确定删除吗？`,
      okType: 'danger',
      onOk: () => {
        deleteServiceCourse({id: this.state.selectedRowKeys[0]}).then(data => {
          message.success("删除成功！");
          this.handleRefresh();
        })
      }
    })
  }

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
      recycle: false,
    };
  }

  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadServiceCourseDataSet(params).then(data => {
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
  handleUpdate = () => {
    loadServiceCourse({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.serviceCourse, update_display: true})
    })
  }

  componentDidMount() {
    this.handleRefresh();
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadServiceCourse({id: record.id}).then(data => {
      this.setState({detail_data: data.data.serviceCourse, detail_display: true})
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
          <TabPane tab="课程列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {
                this.setState({recycle: !this.state.recycle}, () => {
                  this.handleRefresh();
                })
              }}
              doUpdate={this.handleUpdate}
              doDelete={this.handleDelete}
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

export default Course;
