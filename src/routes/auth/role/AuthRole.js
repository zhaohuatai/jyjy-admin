import React, { Component } from 'react';
import style from './menu.scss';
import { message, Tabs , Table, Button, Dropdown, Menu, Pagination, Input, Col, Row, RangePicker, Icon} from 'antd';
import {loadAuthRoleList,deletAuthRole,addPermsToRole,loadPermDataSetForRoleAssign} from '../../../service/auth';
import ProductFilter from './Filter';
import Item from './Item';
import ItemAdd from './ItemAdd';
import AddPerms from './AddPerms';

class AuthRole extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
			loading: true,
			dataSource:[],
			pageRows:50,
			total:0,
			currentPage:1,
			item_visible:false,
			itemadd_visible:false,
      itemperms_delete_visible:false,
			itemperms_add_visible:false,
			item_data:{}
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
		loadAuthRoleList(params, data=>{
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
			case 'delete':
				deletAuthRole({id:this.state.selectedRowKeys[0]},data=>{
					if(data.statusCode==200){
						message.success('操作成功');
						this.getData({page:this.state.currentPage})
					};
				});
				break;
			case 'addperms':
				this.setState({itemperms_add_visible:true});
				break;
			default:
				break;
		}
	}

	handleAddSuccess=()=>{
		this.setState({itemperms_add_visible:false});
		this.handleRefresh();
	}

	handleUpdateSuccess=()=>{
		this.setState({item_visible:false});
		this.handleRefresh();
	}

	handleEditPermsSuccess=(perms)=>{
    console.log(this.state.selectedRowKeys[0],JSON.stringify(perms));
    addPermsToRole({permIds:perms,roleId:this.state.selectedRowKeys[0]},data=>{
      if(data.statusCode==200){
        message.success('操作成功');
        this.setState({itemperms_add_visible:false});
        this.handleRefresh();
      }
    })
	}


	onRowClick=(record, index, event)=>{
    loadPermDataSetForRoleAssign({isInRole:1,roleId:record.id,appKey:'APP_ROOT',rows:1000},data=>{
      record.perms = data.rows;
      this.setState({item_data:record,item_visible:true});
    })
	}

  render() {
		const { loading, selectedRowKeys } = this.state;

    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
			{ title: '名称',  dataIndex: 'name', key: 'name' },
			{ title: '状态',  dataIndex: 'enabled', key: 'enabled' ,render:(text)=>{
				if(text){return '启用'}else{return '禁用'}
			}},
      { title: '描述', dataIndex: 'description', key: 'description',  },
      { title: '所属应用', dataIndex: 'appName', key: 'appName',  },
      { title: '角色码', dataIndex: 'roleCode', key: 'roleCode',  },
      { title: 'appKey', dataIndex: 'appKey', key: 'appKey',  },
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
        <Item onCancel={()=>this.setState({item_visible:false})} visible={this.state.item_visible} data={this.state.item_data} doUpdateSuccess={this.handleUpdateSuccess}/>
				<ItemAdd onCancel={()=>this.setState({itemadd_visible:false})} visible={this.state.itemadd_visible} onAddSuccess={this.handleAddSuccess}/>
				<AddPerms onCancel={()=>this.setState({itemperms_add_visible:false})} onOk={this.handleEditPermsSuccess} visible={this.state.itemperms_add_visible}/>
      </div>
    );
  }
}

export default AuthRole;
