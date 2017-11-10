import React, { Component } from 'react';
import { Tabs , Table, Button, Dropdown, Menu} from 'antd';
import style from './orderlistwaitpay.scss';
import {loadOrdersDataSet} from '../../http';

class OrderListCompleted extends Component {
	constructor(props){
    super(props);
    this.state={
      selectedRowKeys: [],  // Check here to configure the default column
			loading: false,
      dataSource:[],
      searchform:{}
    };
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  componentDidMount(){
    loadOrdersDataSet({},data=>{
			console.log(data);
			this.setState({dataSource:data.data.dataSet.rows});
    })
  }

  handleMenuClick=()=>{

  }

  //确认收货
  handleSingled=()=>{

  }

  //刷新列表
  handleRefresh=()=>{

	}
	
  render() {
    const { loading, selectedRowKeys } = this.state;
		
    const dataSource = [];
    for (let i = 0; i < 100; i++) {
      dataSource.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
		
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">关闭交易</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3d menu item</Menu.Item>
      </Menu>
    );
		
    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
      { title: '订单状态',  dataIndex: 'orderStatus', key: 'age' },
      { title: '买家', dataIndex: 'buyerId', key: '1', },
      { title: '时间', dataIndex: 'orderTime', key: '2',  },
      { title: '付款', dataIndex: 'payFee', key: '3',  },
      { title: '总价', dataIndex: 'totalPrice', key: '4', },
      { title: '留言', dataIndex: 'memo', key: '5',  },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <Dropdown.Button onClick={this.handleSingled} overlay={menu}>确认收货</Dropdown.Button>,
      },];
		
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Button className={style.actionbutton} onClick={this.handleRefresh}>刷新</Button>
        <Table 
          dataSource={this.state.dataSource}
          columns={columns} 
          bordered
          size='middle'
          pagination={{ pageSize: 50 }}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default OrderListCompleted;