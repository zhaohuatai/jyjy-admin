import React, { Component } from 'react';
import style from './user.scss';
import {loadMemberDataSet,setMemberStatus} from '../../http';
import {Table, Button, Dropdown, Menu, Pagination, Input, Col, Row, RangePicker, Icon} from 'antd';
import UserFilter from './UserFilter';


import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class User extends Component {
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
    loadMemberDataSet({
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

			console.log(searchform);
			loadMemberDataSet(searchform, data=>{
				console.log(data);
				console.log(this.state);
				this.setState({
					dataSource:data.data.dataSet.rows,
          loading:false,
          total:data.data.dataSet.total,
          currentPage
				})
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
			loadMemberDataSet({rows:this.state.pageRows,page:this.state.currentPage}, data=>{
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

		loadMemberDataSet(searchform,data=>{
			this.setState({
				dataSource:data.data.dataSet.rows,
				loading:false,
				total:data.data.dataSet.total,
			});
    })
	}

	//设置订单状态
	handleOrderStatus=(status)=>{
		setMemberStatus({
			id:this.state.selectedRowKeys[0],
			status:status
		},data=>{
      console.log(data);
		})
	}

  render() {
    const { loading, selectedRowKeys } = this.state;
    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
			{ title: '状态',  dataIndex: 'status', key: 'status' ,
				render: (text, record, index) => {
					switch (text) {
						case '0':
						  return '禁用';
						case '1':
							return '正常';
						case '2':
							return '注册完成';
						case '3':
						  return '已缴纳保证金';
						case '5':
						  return '注销';
						case '6':
						  return '删除';
						default:
							break;
					}
				}
			},
			{ title: '姓名',  dataIndex: 'name', key: 'name' },
      { title: '昵称', dataIndex: 'nickName', key: 'nickName', },
      { title: '性别', dataIndex: 'sex', key: 'sex', render:(text)=>{
        switch (text) {
          case '0':
            return '女';
          case '1':
            return '男';
          default:
            break;
        }
      } },
      { title: '电话', dataIndex: 'phone', key: 'phone',  },
      { title: '邮箱', dataIndex: 'email', key: 'email', },
      { title: '注册时间', dataIndex: 'createTime', key: 'createTime',  },
      { title: '推广码', dataIndex: 'invitationCode', key: 'invitationCode',  },
      { title: '微信id', dataIndex: 'openId', key: 'openid',  },
      { title: '生日', dataIndex: 'birthday', key: 'birthday',  },
      { title: '账户余额', dataIndex: 'currentMoney', key: 'currentMoney',  },
      { title: '个人介绍', dataIndex: 'introducer', key: 'introducer',  },
      ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={style.orderroot}>

			  <UserFilter doSearch={this.doSearch} cleanform={this.doCleanForm} setorderstatus={this.handleOrderStatus}/>


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

export default User;
