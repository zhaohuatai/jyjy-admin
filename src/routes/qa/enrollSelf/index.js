import React, {Component} from 'react';
import {message, Modal, Pagination, Table, Tabs} from 'antd';
import {
  deleteInterlocutionConsultation,
  loadInterlocutionConsultation,
  loadInterlocutionConsultationDataSet
} from '../../../service/interlocution';
import Filter from './Filter';
import Replay from './Replay';
import Detail from './Detail';

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '标题', dataIndex: 'consultorName', key: 'consultorName'},
  {title: '内容', dataIndex: 'content', key: 'content', render: (text) => '点击查看'},
  {title: '电话', dataIndex: 'phone', key: 'phone'},
  {title: '在线回复', dataIndex: 'onlineReply', key: 'onlineReply'},
  {title: '用户id', dataIndex: 'memberId', key: 'memberId'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
]

class EnrollSelf extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      table_loading: false,
      selectedRowKeys: [],
      table_cur_page: 1,
      table_total: 0,
      search_form: {},
      replay_display: false,
      replay_data: {},
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
    loadInterlocutionConsultationDataSet(params).then(data => {
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
        deleteInterlocutionConsultation({id: this.state.selectedRowKeys[0]}).then(data => {
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

  componentDidMount() {
    this.handleRefresh();
  }

  // 更新
  handleReplay = () => {
    loadInterlocutionConsultation({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({replay_data: data.data.interlocutionConsultation, replay_display: true})
    })
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadInterlocutionConsultation({id: record.id}).then(data => {
      this.setState({detail_data: data.data.interlocutionConsultation, detail_display: true})
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
          <TabPane tab="自主招生问答" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {
                this.setState({recycle: !this.state.recycle}, () => {
                  this.handleRefresh();
                })
              }}
              doDelete={this.handleDelete}
              doReplay={this.handleReplay}
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
        </Tabs>

        <Replay show={this.state.replay_display} data={this.state.replay_data}
                onCancel={() =>{
                  this.handleRefresh();
                  this.setState({replay_display: false})
                }}/>
        <Detail show={this.state.detail_display} data={this.state.detail_data}
                onCancel={() => this.setState({detail_display: false})}/>
      </div>
    );
  }
}

export default EnrollSelf;
