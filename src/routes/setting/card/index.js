import React, {Component} from 'react';
import {message, Pagination, Table, Tabs} from 'antd';
import {loadDataCareer} from '../../../service/base';
import {loadMemberVipCardDataSet} from "../../../service/member";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '卡号', dataIndex: 'VIPNum', key: 'VIPNum'},
  {title: '密码', dataIndex: '', key: '', render: (text) => ('******')},
  {
    title: '状态', dataIndex: 'status', key: 'status', render: (text) => {
    switch (text) {
      case 1:
        return '正常';
      case 3:
        return '已激活';
      default:
        return '已失效';
    }
  }
  },
  {title: '激活日期', dataIndex: 'startDate', key: 'startDate', render: (text) => text ? text : '未被激活'},
  {title: '激活会员ID', dataIndex: 'memberId', key: 'memberId', render: (text) => text ? text : '-'},
  {title: '激活会员', dataIndex: 'memberName', key: 'memberName', render: (text) => text ? text : '-'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
]

class VipCard extends Component {
  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadMemberVipCardDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    }).catch((e) => {
      message.error(e);
    });
  }
  // 切换页码
  onChangeTablePage = (currentPage) => {
    this.setState({table_loading: true, table_cur_page: currentPage});
    let searchForm = this.state.search_form;
    searchForm['page'] = currentPage;
    this.handleRefresh(searchForm)
  };
  // 搜索
  handleSearch = (values) => {
    this.setState({table_cur_page: 1});
    this.handleRefresh(values);
  };
  // 显示详情
  handleShowDetail = (record) => {
    loadDataCareer({id: record.id}).then(data => {
      this.setState({detail_data: data.data.dataCareer, detail_display: true})
    })
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  };

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

  componentDidMount() {
    this.handleRefresh();
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
          <TabPane tab="会员卡" key="1">
            <Table
              dataSource={this.state.dataSet}
              columns={table_columns}
              pagination={false}
              rowKey={record => record.id + ''}
              loading={table_loading}
              rowSelection={rowSelection}
              onRowClick={this.handleShowDetail}
            />
            <Pagination style={{marginTop: '10px'}} showQuickJumper defaultCurrent={1} current={table_cur_page}
                        defaultPageSize={20} total={table_total} onChange={this.onChangeTablePage}/>,
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default VipCard;
