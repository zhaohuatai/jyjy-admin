import React, {Component} from 'react';
import {message, Pagination, Table, Tabs, Modal} from 'antd';
import Filter from './Filter';
import {loadMemberCouponDataSet} from "../../../service/member";
import {IMG_DOMAIN} from "../../../utils/config";

const TabPane = Tabs.TabPane;

const table_columns = [
  {title: '序号', dataIndex: 'memberCoupon.id', key: 'id'},
  {title: '买家', dataIndex: 'memberCoupon.memberName', key: 'memberName'},
  {title: '兑换时间', dataIndex: 'memberCoupon.exchangeTime', key: 'exchangeTime'},
  {title: '兑换面值', dataIndex: 'memberCoupon.faceValue', key: 'faceValue'},
  {title: '兑换积分', dataIndex: 'memberCoupon.consumePoints', key: 'consumePoints'},
  {title: '用户id', dataIndex: 'memberCoupon.memberId', key: 'memberId'},
  {title: '优惠券名称', dataIndex: 'coupon.name', key: 'name'},
  {title: '优惠券面值', dataIndex: 'coupon.faceValue', key: 'coupon_faceValue'},
  {title: '优惠券积分', dataIndex: 'coupon.changePoints', key: 'changePoints'},
  {title: '优惠券缩略图', dataIndex: 'coupon.thumbNailImage', key: 'thumbNailImage',
    render: (text) => <img src={IMG_DOMAIN + text} style={{height: '40px', width: '40px'}}/>
  },
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
    loadMemberCouponDataSet(params).then(data => {
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
          <TabPane tab="优惠券兑换记录" key="1">
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
      </div>
    );
  }
}

export default Course;
