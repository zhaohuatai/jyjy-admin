import React, {Component} from 'react';
import {message, Pagination, Table, Tabs, Modal} from 'antd';
import {loadCouponDataSet, loadCoupon, deleteCoupon} from '../../../service/coupon';
import Filter from './Filter';
import New from './New';
import Detail from './Detail';
import {IMG_DOMAIN} from "../../../utils/config";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '名称', dataIndex: 'name', key: 'name'},
  {title: '兑换积分', dataIndex: 'changePoints', key: 'changePoints'},
  {title: '面值', dataIndex: 'faceValue', key: 'faceValue'},
  {title: '缩略图', dataIndex: 'thumbNailImage', key: 'thumbNailImage', render: (text) => <img src={`${IMG_DOMAIN}${text}`} style={{height: '40px', width: '40px'}} />},
  {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
]

class Teacher extends Component {

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
  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadCouponDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    }).catch((e) => {
      message.error(e);
    })
  }

  // 删除记录
  handleDelete = () => {
    console.log('123');
    Modal.confirm({
      title: '确定删除',
      okType: 'danger',
      onOk: () => {
        deleteCoupon({id: this.state.selectedRowKeys[0]}).then(data => {
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
  handleUpdate = () => {
    loadCoupon({id: this.state.selectedRowKeys[0]}).then(data => {
      this.setState({update_data: data.data.coupon, update_display: true})
    })
  }

  // 显示详情
  handleShowDetail = (record) => {
    loadCoupon({id: record.id}).then(data => {
      this.setState({detail_data: data.data.coupon, detail_display: true})
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
          <TabPane tab="优惠券列表" key="1">
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
        <Detail show={this.state.detail_display} data={this.state.detail_data}
                onCancel={() => this.setState({detail_display: false})}/>
      </div>
    );
  }
}

export default Teacher;
