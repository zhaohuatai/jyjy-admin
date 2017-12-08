import React, {Component} from 'react';
import {message, Pagination, Table, Tabs, Modal} from 'antd';
import Filter from './Filter';
import Detail from './Detail';
import {loadMemberVipOrderDataSet, loadMemberVipOrder} from "../../../service/member";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '买家', dataIndex: 'memberName', key: 'memberName'},
  {title: '订单状态', dataIndex: 'orderStatus', key: 'orderStatus', render: (text, record, index) => {
    switch (text) {
      case '1':
        return '等待付款';
      case '2':
        return '已完成';
      case '3':
        return '退款中';
      case '4':
        return '交易关闭';
      default:
        break;
    }
  }},
  {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
  {title: '购买的课程', dataIndex: 'serviceCourseList[0].name', key: 'name'},
  {title: '订单编号', dataIndex: 'ordersn', key: 'ordersn'},
  {title: '使用优惠券', dataIndex: 'memberCouponIds', key: 'memberCouponIds'},
  {title: '实付款', dataIndex: 'payFee', key: 'payFee'},
  {title: '支付状态', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (text, record, index) => {
    switch (text) {
      case '1':
        return '未支付';
      case '2':
        return '已支付';
      case '3':
        return '等待退款';
      case '4':
        return '已退款';
      default:
        break;
    }
  }},
  {title: '支付类型', dataIndex: 'paymentType', key: 'paymentType', render: (text, record, index) => {
    switch (text) {
      case '1':
        return '微信';
      default:
        break;
    }
  }},
  {title: '留言', dataIndex: 'memo', key: 'memo'},
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
      detail_display: false,
      detail_data: {
        serviceCourseOrderItemsList: [],
        serviceCourseOrder: {
          ordersn: '',
          wxPrepayId: '',
          memberCouponIds: '',
          orderStatus: '',
          createTime:'',
          memo: ''
        },
        member: {},
      },
      recycle: false
    };
  }

  // 获取数据
  handleRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadMemberVipOrderDataSet(params).then(data => {
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

    console.log(values);

    this.handleRefresh(values)
  }

  componentDidMount() {
    this.handleRefresh();
  }

  // 显示详情
  handleShowDetail = (record) => {
    console.log(record);
    loadMemberVipOrder({id: record.id}).then(data => {
      this.setState({detail_data: data.data.memberVipOrder, detail_display: true})
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
          <TabPane tab="VIP购买订单列表" key="1">
            <Filter
              doSearch={this.handleSearch}
              doRefresh={() => this.handleRefresh({page: this.state.table_cur_page, status: '1'})}
              doUpdate={this.handleUpdate}
              doDelete={this.handleDelete}
              recycle={this.state.recycle}
              doRecycle={() => {
                this.setState({recycle: !this.state.recycle}, () => {
                  this.handleRefresh();
                })
              }}
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
        <Detail show={this.state.detail_display} data={this.state.detail_data}
                onCancel={() => this.setState({detail_display: false})}/>
      </div>
    );
  }
}

export default Course;
