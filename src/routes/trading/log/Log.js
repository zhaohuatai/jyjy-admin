import React, { Component } from 'react';
import { Tabs , Table, Button, Dropdown, Menu, Pagination, Input, Col, Row, RangePicker, Icon} from 'antd';
import style from './log.scss';
import {loadMemberAccountLogDataSet} from '../../../http';
import LogFilter from './LogFilter';

class Log extends Component {
	constructor(props){
    super(props);
    this.state={
      selectedRowKeys: [],
			loading: true,
			dataSource:[],
			pageRows:50,
			total:0,
			currentPage:1,
			searchform:{
				orderStatus:'',
				orderTimeStart:'',
				orderTimeEnd:'',
				ordersn:'',
				buyerId:'',
				shopId:'',
				rows:50,
				page:1
			}
    };
	}

  componentDidMount(){
    loadMemberAccountLogDataSet({
			rows:this.state.pageRows,
			page:this.state.currentPage
		},data=>{
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

			let searchform = this.state.searchform;

			searchform.rows = this.state.pageRows;
			searchform.page = currentPage;

			console.log(searchform);
			loadMemberAccountLogDataSet(searchform, data=>{
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
  handleRefresh=()=>{
		this.setState({loading:true});

		this.setState({currentPage:1},()=>{
			loadOrdersDataSet({rows:this.state.pageRows,page:this.state.currentPage}, data=>{
				console.log(data);
				this.setState({
					dataSource:data.data.dataSet.rows,
				})
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

  render() {
    const { loading, selectedRowKeys } = this.state;



    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
			{ title: '状态',  dataIndex: 'payStatus', key: 'payStatus' ,
				render: (text, record, index) => {
					switch (text) {
						case '0':
							return '失败';
						case '1':
							return '成功';
						default:
							break;
					}
				}
		  },
			{ title: '用户id',  dataIndex: 'memberId', key: 'memberId' },
      { title: '交易单号', dataIndex: 'transactionNo', key: 'transactionNo', },
      { title: '金额', dataIndex: 'amount', key: 'amount', },
			{ title: '时间', dataIndex: 'transactionTime', key: 'transactionTime',  },
			{ title: '交易失败码', dataIndex: 'failCode', key: 'failCode',  },
			{ title: '失败原因', dataIndex: 'failMsg', key: 'failMsg',  },
			{ title: '类型', dataIndex: 'changeType', key: 'changeType',
				render: (text, record, index) => {
					switch (text) {
						case '1':
							return '充值';
						case '2':
							return '提现';
						case '3':
							return '缴纳商品保证金';
						case '4':
							return '退回商品保证金';
						case '5':
							return '会员推广';
						case '6':
							return '管理员调节';
						case '7':
							return '商品出售';
						case '8':
							return '商品购买';
						case '9':
							return '缴纳会费';
						case '99':
							return '其它';
						default:
							break;
					}
				}
		  },
			{ title: '备注', dataIndex: 'remark', key: 'remark',  },
      ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={style.orderroot}>

			  <LogFilter doSearch={this.doSearch} cleanform={this.doCleanForm} action={this.handleActionClick}/>
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          bordered
          size='middle'
					loading={this.state.loading}
          rowSelection={rowSelection}
					rowKey={record => record.id}
					pagination={false}
        />
			<Pagination className={style.pagination} showQuickJumper defaultCurrent={1} current={this.state.currentPage} defaultPageSize={50} total={this.state.total} onChange={this.onChangePage} />,
      </div>
    );
  }
}

export default Log;
