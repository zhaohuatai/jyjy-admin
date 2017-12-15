import React, {Component} from 'react';
import {message, Modal, Pagination, Table, Tabs} from 'antd';
import {deleteDataUniversity, loadDataUniversity, loadDataUniversityDataSet} from '../../../service/base';
import Filter from './Filter';
import New from './New';
import Update from './Update';
import Detail from './Detail';

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '名称', dataIndex: 'name', key: 'name'},
  {title: '排名', dataIndex: 'rank', key: 'rank'},
  {title: '省份', dataIndex: 'province', key: 'province'},
  {title: '学校层次', dataIndex: 'stage', key: 'stage'},
  {
    title: '双一流', dataIndex: 'firstRate', key: 'firstRate', render: (text) => {
    return text === 1 ? "是" : "否"
  }
  },
  {title: '招生电话', dataIndex: 'phone', key: 'phone'},
  {title: '学校隶属', dataIndex: 'attached', key: 'attached'},
  {title: '地址', dataIndex: 'location', key: 'location'},
  {title: '院士人数', dataIndex: 'academicianNum', key: 'academicianNum'},
  {title: '博士点数', dataIndex: 'doctor', key: 'doctor'},
  {title: '硕士点数', dataIndex: 'masterNum', key: 'masterNum'},
  {title: '学生数', dataIndex: 'studentNum', key: 'studentNum'},
]

class School extends Component {
  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadDataUniversityDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    }).catch((e) => {
      message.error(e);
    })
  }


  // 删除记录
  handleDelete = () => {
    Modal.confirm({
      title: `确定删除吗？`,
      okType: 'danger',
      onOk: () => {
        deleteDataUniversity({id: this.state.selectedRowKeys[0]}).then(data => {
          message.success("删除成功！");
          this.handleRefresh();
        });
      }
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
    loadDataUniversity({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.dataUniversity, update_display: true})
    })
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadDataUniversity({id: record.id}).then(data => {
      this.setState({detail_data: data.data.dataUniversity, detail_display: true})
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
          <TabPane tab="学校列表" key="1">
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
                onCancel={() =>{
                  this.handleRefresh();
                  this.setState({update_display: false})
                } }/>
        <Detail show={this.state.detail_display} data={this.state.detail_data}
                onCancel={() => this.setState({detail_display: false})}/>
      </div>
    );
  }
}

export default School;
