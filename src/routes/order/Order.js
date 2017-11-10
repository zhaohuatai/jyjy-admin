import React, { Component } from 'react';
import { Tabs , Table, Button, Dropdown, Menu, Pagination, Input, Col, Row, RangePicker, Icon} from 'antd';
import style from './order.scss';
import {loadOrdersDataSet,confirmReceipt,setOrdersStatus,loadOrdersDetails} from '../../http';
import OrderFilter from './OrderFilter';
import OrderItem from './OrderItem';

class Order extends Component {
	constructor(props){
    super(props);
    this.state={
      selectedRowKeys: [],
			loading: true,
			dataSource:[],
			pageRows:50,
			total:0,
			currentPage:1,
			item_visible:false,
			item_data:{
				buyer:{
					member:{
						name:'',
						nickName:'',
						phone:''
					}
				},
				seller:{
					member:{
						name:'',
						nickName:'',
						phone:''
					}
				},
				orderResultItemDto:[
					{
						product:{
							productName:'',
							id:0,
							mainImage:'',
							age:'',
							author:'',
							sizex:''
						}
					}
				]
			},
			searchform:{
				orderStatus:'',
				orderTimeStart:'',
				orderTimeEnd:'',
				ordersn:'',
				buyerId:'',
				shopId:'',
				rows:2,
				page:1
			}
    };
	}

  componentDidMount(){
    loadOrdersDataSet({
			orderStatusList:'4',
			rows:this.state.pageRows,
			page:this.state.currentPage
		},data=>{
			console.log(data);
			this.setState({
				dataSource:data.data.dataSet.rows,
				loading:false,
				total:data.data.dataSet.total
			});
    })
	}

	//选择列
	onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

	//操作
  handleActionClick=({item, key})=>{
		console.log(item,key);
	}

	//切换页码
	onChangePage=(currentPage)=>{
		this.setState({loading:true});

			let searchform = this.state.searchform;

			searchform.rows = this.state.pageRows;
			searchform.page = currentPage;

			loadOrdersDataSet(searchform, data=>{
				console.log(data);
				console.log(this.state);
				this.setState({
					dataSource:data.data.dataSet.rows,
					loading:false,
					total:data.data.dataSet.total,
					currentPage
				});
			})
	}

  //确认收货
  handleSingled=(id)=>{
		confirmReceipt({id:id},data=>{
			console.log(data);
		})
  }

  //刷新列表
  handleRefresh=(param)=>{
		this.setState({currentPage:1,loading:true},()=>{
			loadOrdersDataSet({rows:this.state.pageRows,page:this.state.currentPage,orderStatusList:this.state.searchform.orderStatusList}, data=>{
				this.setState({
					dataSource:data.data.dataSet.rows,
					loading:false,
					total:data.data.dataSet.total
				});
			})
		});
	}

	//清空form
	doCleanForm=()=>{
		console.log('doclean');
	}

	//搜索
	doSearch=(searchform)=>{
		searchform.rows = this.state.pageRows;
		searchform.page = 1;

		this.setState({currentPage:1, searchform:searchform});

		console.log(searchform);

		loadOrdersDataSet(searchform,data=>{
			this.setState({
				dataSource:data.data.dataSet.rows,
				loading:false,
				total:data.data.dataSet.total,
			});
    })
	}

	//设置订单状态
	handleOrderStatus=(status)=>{
		setOrdersStatus({
			ordersId:this.state.selectedRowKeys[0],
			status:status
		},data=>{
      console.log(data);
		})
	}

	RowClick=(record, index, event)=>{
    loadOrdersDetails({ordersId:record.id},data=>{
			console.log(data);
      //let item_data = this.state.dataSource[index];
      //item_data.seller = data.data;
      this.setState({item_visible:true,item_data:data.data.ordersDetails});
    })
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
			{ title: '订单状态',  dataIndex: 'orderStatus', key: 'age' ,
				render: (text, record, index) => {
					switch (text) {
						case '1':
							return '等待付款';
						case '2':
							return '已付款';
						case '4':
						  return '已发货';
						case '5':
						  return '确认收货';
						case '8':
						  return '已评价';
						case '9':
						  return '交易完成';
						case '10':
						  return '交易关闭';
						default:
							break;
					}
				}
		  },
			{ title: '订单号',  dataIndex: 'ordersn', key: 'ordersn' },
      { title: '买家', dataIndex: 'buyerId', key: '1', },
      { title: '时间', dataIndex: 'orderTime', key: '2',  },
      { title: '付款', dataIndex: 'payFee', key: '3',  },
      { title: '总价', dataIndex: 'totalPrice', key: '4', },
      { title: '留言', dataIndex: 'memo', key: '5',  },
      ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={style.orderroot}>
			  <OrderFilter doSearch={this.doSearch} cleanform={this.doCleanForm} setorderstatus={this.handleOrderStatus}/>
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          bordered
          size='middle'
					loading={this.state.loading}
          rowSelection={rowSelection}
					rowKey={record => record.id+''}
					pagination={false}
					onRowClick={this.RowClick}
        />
				<Pagination className={style.pagination} showQuickJumper defaultCurrent={1} current={this.state.currentPage} defaultPageSize={2} total={this.state.total} onChange={this.onChangePage} />,
				<OrderItem onCancel={()=>this.setState({item_visible:false})} visible={this.state.item_visible} data={this.state.item_data}/>
		  </div>
    );
  }
}

export default Order;
