import React, {Component} from 'react';
import {loadDicSysconfig, loadDicSysconfigDataSet} from '../../../service/system';
import {message, Pagination, Table, Tabs} from 'antd';
import Filter from './Filter';
import Update from "./Update";

const TabPane = Tabs.TabPane;

class Setting extends Component {
  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadDicSysconfigDataSet(params).then(data => {
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
    loadDicSysconfig({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.pubCustomize, update_display: true})
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      table_loading: true,
      dataSet: [],
      table_total: 0,
      table_cur_page: 1,
      visible_update: false,
      cur_config_update_data: {
        confName: '',
        confCode: '',
        confValue: ''
      }
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  render() {
    const {loading, total, currentPage, selectedRowKeys} = this.state;

    const columns = [
      {title: '序号', dataIndex: 'id', key: 'id'},
      {title: '配置码', dataIndex: 'confCode', key: 'confCode',},
      {title: '配置名称', dataIndex: 'confName', key: 'confName'},
      {title: '对应值', dataIndex: 'confValue', key: 'confValue'},
      {
        title: '状态', dataIndex: 'status', key: 'status',
        render: (text) => {
          switch (text) {
            case 1:
              return '正常';
            case 2:
              return '删除';
            default:
              break;
          }
        }
      }];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="配置" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doRecycle={() => {
                this.setState({recycle: !this.state.recycle}, () => {
                  this.handleRefresh();
                })
              }}
              doUpdate={this.handleUpdate}
              recycle={this.state.recycle}

            />
            <Table
              dataSource={this.state.dataSet}
              columns={columns}
              bordered
              loading={loading}
              rowSelection={rowSelection}
              rowKey={record => record.id}
              pagination={false}
            />
            <Pagination style={{marginTop: '10px'}} showQuickJumper defaultCurrent={1} current={currentPage}
                        defaultPageSize={20} total={total} onChange={this.onChangeTablePage}/>
          </TabPane>
        </Tabs>

        <Update visible={this.state.visible_update} onCancel={() => this.setState({visible_update: false})}
                onCreate={this.handleUpdateSysconfig} formData={this.state.cur_config_update_data}/>
      </div>
    );
  }
}

export default Setting;
