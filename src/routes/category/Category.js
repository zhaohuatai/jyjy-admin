import React, { Component } from 'react';
import { Tabs , Table, Button, Dropdown, Menu, Pagination, Input, Col, Row, RangePicker, Icon,message} from 'antd';
import CategoryFilter from './CategoryFilter';
import {loadProductCategoryTree,enableCategoryAttr,disableCategory,deleteCategory} from '../../http';
import style from './category.scss';
class Categroy extends Component {
  constructor(props){
    super(props);
    this.state={
			dataSource:[],
			loading:false,
			selectedRowKeys:[]
    };
  }
	
  componentDidMount(){
    loadProductCategoryTree({},data=>{
			let dataSource=[];
			data.data.categoryTreeDto.childCategorys.map(item=>{
				dataSource.push(item.category);
			})
			this.setState({dataSource})
    });
	}
	
	//选择列
	onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
	}
	
	//操作
	handleOperation = (key)=>{
		let id = this.state.selectedRowKeys[0];
		switch (key) {
			case 'delete':
				deleteCategory({id:id},data=>{
					if(data.statusCode ==200){
						message.success('操作成功');
						loadProductCategoryTree({},data=>{
							let dataSource=[];
							data.data.categoryTreeDto.childCategorys.map(item=>{
								dataSource.push(item.category);
							})
							this.setState({dataSource})
						});
					}
				})
			break;
		case 'disable':
				disableCategory({id:id},data=>{
					if(data.statusCode ==200){
						message.success('操作成功');
						loadProductCategoryTree({},data=>{
							let dataSource=[];
							data.data.categoryTreeDto.childCategorys.map(item=>{
								dataSource.push(item.category);
							})
							this.setState({dataSource})
						});
					}
				})
		break;
		case 'enable':
				enableCategoryAttr({id:id},data=>{
					if(data.statusCode ==200){
						message.success('操作成功');
						loadProductCategoryTree({},data=>{
							let dataSource=[];
							data.data.categoryTreeDto.childCategorys.map(item=>{
								dataSource.push(item.category);
							})
							this.setState({dataSource})
						});
					}
				})
		break;
			default:
				break;
		}
	}

  render() {
		const { loading, selectedRowKeys } = this.state;

    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
      { title: '名称',  dataIndex: 'name', key: 'name' },
      { title: '图片路径',  dataIndex: 'imgPath', key: 'imgPath' },
      { title: '上级id', dataIndex: 'parentId', key: 'parentId',  },
      { title: '状态', dataIndex: 'status', key: 'status',  render: (text, record, index) =>{
				switch (text) {
					case '1':
						return '启用'
						break;
					case '0':
						return '禁用'
						break;
					case '2':
						return '删除'
						break;
					default:
						break;
				}
				 <a href="#">Delete</a>}
			},
      { title: '创建时间', dataIndex: 'recordTime', key: 'recordTime', },
      { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime',  },
    ];
		
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
		};
		
    return (
      <div className={style.root}>
			  <CategoryFilter operation={this.handleOperation}/>

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
      </div>
    );
  }
}

export default Categroy;