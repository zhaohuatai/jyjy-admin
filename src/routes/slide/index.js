import React, { Component } from 'react';
import { Tabs, Table, Pagination } from 'antd';
import {loadPubSlideDataSet, deletePubSlide, loadPubSlide} from '../../service/slide';
import Filter from './Filter';
import New from './New';
import Update from './Update';
import Detail from './Detail';

const TabPane = Tabs.TabPane;

const table_columns = [
  { title: 'id', dataIndex: 'id', key: 'id'},
  { title: '标题', dataIndex: 'title', key: 'title'},
  { title: '缩略图', dataIndex: 'imgUrl', key: 'imgUrl'},
  { title: '备注', dataIndex: 'remark', key: 'remark'},
  { title: '权重', dataIndex: 'showWeight', key: 'showWeight'},
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime'},
]

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: [],
      table_loading: false,
      selectedRowKeys: [],
      table_cur_page: 1,
      table_total: 0,
      searchform:{},
      update_display: false,
      update_data:{},
      detail_display: false,
      detail_data:{},
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  // 获取数据
  handleRefresh = (params) => {
    this.setState({ table_loading: true });
    loadPubSlideDataSet(params).then(data => {
      this.setState({slide: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false })
    })
  }

  // 勾选记录
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  // 切换页码
  onChangeTablePage = (currentPage) => {
    this.setState({table_loading:true, table_cur_page: currentPage});
    let searchform = this.state.search_form;
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
    deletePubSlide({id: this.state.selectedRowKeys[0]}).then(data => {
      this.handleRefresh();
    });
  }

  // 更新
  handleUpdate = () => {
    loadPubSlide({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({ update_data: data.data.pubSlide, update_display: true })
    })
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadPubSlide({id: record.id}).then(data => {
      this.setState({ detail_data: data.data.pubSlide, detail_display: true })
    })
  }

  render() {
    const { table_loading, selectedRowKeys, table_cur_page, table_total } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return(
      <div style={{backgroundColor: '#fff', padding: '10px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="职业列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={()=>this.handleRefresh({page: this.state.table_cur_page})}
              doDelete={this.handleDelete}
              doUpdate={this.handleUpdate}

            />
            <Table
              dataSource={this.state.slide}
              columns={table_columns}
              pagination={false}
              rowKey={record => record.id+''}
              loading={table_loading}
              bordered
              rowSelection={rowSelection}
              onRowClick={this.handleShowDetail}
            />
            <Pagination style={{ marginTop: '10px' }} showQuickJumper defaultCurrent={1} current={table_cur_page} defaultPageSize={20} total={table_total} onChange={this.onChangeTablePage} />,
          </TabPane>
          <TabPane tab="新建" key="2">
            <New/>
          </TabPane>
        </Tabs>

        <Update show={this.state.update_display} data={this.state.update_data} onCancel={()=>this.setState({update_display: false})}/>
        <Detail show={this.state.detail_display} data={this.state.detail_data} onCancel={()=>this.setState({detail_display: false})}/>
      </div>
    );
  }
}

export default School;
