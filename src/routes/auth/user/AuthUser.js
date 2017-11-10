import React, { Component } from 'react';
import style from './menu.scss';
import { message, Tabs , Table, Button, Dropdown, Menu, Pagination, Input, Col, Row, RangePicker, Icon} from 'antd';
import {loadAuthUserList,loadUpdateData} from '../../../http';
import ProductFilter from './Filter';
import Item from './Item';
import ItemAdd from './ItemAdd';
import ItemEdit from './ItemEdit';
import UserAddRole from './UserAddRole';

class AuthUser extends Component {
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
			itemadd_visible:false,
			itemaddrole_visible:false,
			item_data:{},
      itemedit_visible:false,
      itemedit_data:{},
    };
	}

  componentDidMount(){
		this.getData();
	}

	//选择列
	onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

	//切换页码
	onChangePage=(currentPage)=>{
		this.getData({page:currentPage});
		this.setState({currentPage})
	}

  //获取数据
  getData=(params={})=>{
		this.setState({loading:true});
		loadAuthUserList(params, data=>{
				this.setState({
					dataSource:data.rows,
					loading:false,
					total:data.total
				});
			})
	}

	//刷新当前页面
	handleRefresh=()=>{
		this.getData({page:this.state.currentPage});
	}

	//操作
	handleAction=(key)=>{
		switch (key) {
			case 'delete':break;
			case 'addrole':
			  this.setState({itemaddrole_visible:true});
			  break;
      case 'edit':
        loadUpdateData({id:this.state.selectedRowKeys[0]},data=>{
          this.setState({itemedit_data:data.data.authUser});
        })
			  this.setState({itemedit_visible:true,});
			  break;
			default:
				break;
		}
	}

	onRowClick=(record, index, event)=>{
		//console.log(record);
		//this.setState({item_data:record,item_visible:true});
	}

	handleAddRoleSuccess=()=>{
		this.setState({itemaddrole_visible:false});
		this.handleRefresh();
	}

  render() {
		const { loading, selectedRowKeys } = this.state;

    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
      { title: '账号',  dataIndex: 'account', key: 'account' },
			{ title: '状态',  dataIndex: 'enabled', key: 'enabled' , render:(text)=>{
				if(text){return '启用'}else{return '禁用'}
			}},
			{ title: '冻结',  dataIndex: 'accountLocked', key: 'accountLocked' , render:(text)=>{
				if(text){return '是'}else{return '否'}
			}},
			{ title: '权限级别',  dataIndex: 'authLevel', key: 'authLevel' },
			{ title: '密码是否过期', dataIndex: 'credentialsExpired', key: 'credentialsExpired', render:(text)=>{
				if(text){return '是'}else{return '否'}
			}},
			{ title: '账户是否过期', dataIndex: 'accountExpired', key: 'accountExpired', render:(text)=>{
				if(text){return '是'}else{return '否'}
			}},
      { title: '微博', dataIndex: 'weiboNum', key: 'weiboNum',  },
			{ title: '姓名', dataIndex: 'perName', key: 'perName',  },
			{ title: 'QQ', dataIndex: 'qqNum', key: 'qqNum',  },
			{ title: '电话', dataIndex: 'phoneNum', key: 'phoneNum',  },
			{ title: '微信', dataIndex: 'weichat', key: 'weichat',  },
			{ title: '微信id', dataIndex: 'openId', key: 'openId' },
			{ title: '证件号码', dataIndex: 'perIdCardNum', key: 'perIdCardNum' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', },
      { title: '默认组织机构', dataIndex: 'defaultOrg', key: 'defaultOrg',  },
			{ title: '默认角色名', dataIndex: 'defualtRoleName', key: 'defualtRoleName',  },
			{ title: '默认职位', dataIndex: 'defaultPosition', key: 'defaultPosition' },

			{ title: '操作', dataIndex: 'action', key: 'action' },
      ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={style.orderroot}>
			  <ProductFilter action={this.handleAction} doAdd={()=>this.setState({itemadd_visible:true})} doRefresh={this.handleRefresh}/>
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          bordered
          size='middle'
					loading={this.state.loading}
          rowSelection={rowSelection}
					rowKey={record => record.id}
					pagination={false}
					onRowClick={this.onRowClick}
        />
				<Pagination className={style.pagination} showQuickJumper defaultCurrent={1} current={this.state.currentPage} defaultPageSize={50} total={this.state.total} onChange={this.onChangePage} />,
        {/*<Item onCancel={()=>this.setState({item_visible:false})} visible={this.state.item_visible} data={this.state.item_data}/>*/}
				<ItemAdd onCancel={()=>this.setState({itemadd_visible:false})} visible={this.state.itemadd_visible} onOk={()=>{this.handleRefresh;this.setState({itemadd_visible:false})}}/>
        <ItemEdit onCancel={()=>this.setState({itemedit_visible:false})} visible={this.state.itemedit_visible} onOk={()=>{this.handleRefresh;this.setState({itemedit_visible:false})}} data={this.state.itemedit_data}/>
        <UserAddRole onCancel={()=>this.setState({itemaddrole_visible:false})} visible={this.state.itemaddrole_visible} onAddSuccess={this.handleAddRoleSuccess} userid={this.state.selectedRowKeys}/>
			</div>
    );
  }
}

export default AuthUser;
