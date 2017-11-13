import React, { Component } from 'react';
import { Tabs, Table, Pagination } from 'antd';
import {loadDataUniversityDataSet, deleteDataUniversity} from '../../../service/university';
import Filter from './Filter';
import New from './New';

const TabPane = Tabs.TabPane;

const table_columns = [
  { title: 'id', dataIndex: 'id', key: 'id'},
  { title: '名称', dataIndex: 'name', key: 'name'},
  { title: '院士人数', dataIndex: 'academicianNum', key: 'academicianNum'},
  { title: '省份编码', dataIndex: 'provinceCode', key: 'provinceCode'},
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime'},
  { title: '备注', dataIndex: 'remark', key: 'remark'},
  { title: '博士点数', dataIndex: 'doctor', key: 'doctor'},
  { title: 'Age', dataIndex: 'badge', key: 'badge'},
  { title: '省份', dataIndex: 'province', key: 'province'},
  { title: '学校层次', dataIndex: 'stage', key: 'stage'},
  { title: '招生电话', dataIndex: 'phone', key: 'phone'},
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
  { title: '学校隶属', dataIndex: 'attached', key: 'attached'},
  { title: '排名', dataIndex: 'rank', key: 'rank'},
  { title: '地址', dataIndex: 'location', key: 'location'},
  { title: '双一流', dataIndex: 'firstRate', key: 'firstRate'},
  { title: '硕士点数', dataIndex: 'masterNum', key: 'masterNum'},
  { title: '学生数', dataIndex: 'studentNum', key: 'studentNum'},
  { title: '状态', dataIndex: 'status', key: 'status'},
]

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      university: [],
      table_loading: false,
      TableselectedRowKeys: [],
      table_cur_page: 1,
      table_total: 0,
      searchform:{}
    };
  }


  componentDidMount() {
    this.handleRefresh();
  }

  // 获取数据
  handleRefresh = (params) => {
    this.setState({ table_loading: true });
    loadDataUniversityDataSet(params).then(data => {
      this.setState({university: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false })
    })
  }



  // 勾选记录
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  // 切换页码
  onChangeTablePage = (currentPage) => {
    this.setState({table_loading:true, table_cur_page: currentPage});
    let searchform = this.state.searchform;
    searchform.page = currentPage;
    this.handleRefresh(searchform)
  }

  // 搜索
  handleSearch = (values) => {
    this.setState({table_cur_page: 1});
    this.handleRefresh(values)
  }

  // 删除记录
  handleDelete = () => {
    deleteDataUniversity(this.state.selectedRowKeys[0]);
  }

  render() {
    const { table_loading, TableselectedRowKeys, table_cur_page, table_total } = this.state;

    const rowSelection = {
      TableselectedRowKeys,
      onChange: this.onSelectChange,
    };

    return(
      <div style={{backgroundColor: '#fff', padding: '10px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="学校列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={()=>this.handleRefresh({page: this.state.table_cur_page})}
              doDelete={this.handleDelete}

            />
            <Table
              dataSource={this.state.university}
              columns={table_columns}
              pagination={false}
              rowKey={record => record.id+''}
              loading={table_loading}
              bordered
              rowSelection={rowSelection}
            />
            <Pagination style={{ marginTop: '10px' }} showQuickJumper defaultCurrent={1} current={table_cur_page} defaultPageSize={20} total={table_total} onChange={this.onChangeTablePage} />,
          </TabPane>
          <TabPane tab="新建" key="2">
            <New/>
          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default School;
