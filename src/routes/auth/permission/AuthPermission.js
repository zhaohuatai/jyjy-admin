import React, {Component} from 'react';
import style from './menu.scss';
import {Pagination, RangePicker, Table} from 'antd';
import {loadAuthPermissionList} from '../../../service/auth';
import ProductFilter from './Filter';
import Item from './Item';
import ItemAdd from './ItemAdd';

class AuthPermission extends Component {
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
			loadAuthPermissionList(params, data=>{
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
			default:
				break;
		}
	}

	onRowClick=(record, index, event)=>{
		console.log(record);
		this.setState({item_data:record,item_visible:true});
	}
	
  render() {
		const { loading, selectedRowKeys } = this.state;
		
    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
			{ title: '状态',  dataIndex: 'enabled', key: 'enabled' , render:(text)=>{
				if(text){return '启用'}else{return '禁用'}
			}},
			{ title: '名称',  dataIndex: 'name', key: 'name' },
      { title: '描述', dataIndex: 'description', key: 'description',  },
      { title: '所属应用', dataIndex: 'appName', key: 'appName',  },
      { title: '所属模块', dataIndex: 'moduleName', key: 'moduleName', },
      { title: '类型', dataIndex: 'type', key: 'type',  },
      { title: 'appKey', dataIndex: 'appKey', key: 'appKey',  },
      { title: '权限码', dataIndex: 'permCode', key: 'permCode',  },
			{ title: '权限路径', dataIndex: 'url', key: 'url',  },
			{ title: '操作', dataIndex: 'action', key: 'action' },
      ];
		
    const rowSelection = {
      type: 'radio',
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
        <Item onCancel={()=>this.setState({item_visible:false})} visible={this.state.item_visible} data={this.state.item_data}/>
				<ItemAdd onCancel={()=>this.setState({itemadd_visible:false})} visible={this.state.itemadd_visible}/>

			</div>
    );
  }
}

export default AuthPermission;