import React, { Component } from 'react';
import { Input, Col, Row, DatePicker, Button, Select, Dropdown, Menu, Icon} from 'antd';
import style from './orderlistwaitpay.scss';

const Option = Select.Option;

class OrderFilter extends Component {
  constructor(props){
    super(props);
    this.state={
      orderStatus:'4',
      orderTimeStart:'',
      orderTimeEnd:'',
      ordersn:'',
      buyerId:'',
      shopId:''
    };
  }

  setRangeDate=(date, dateString)=>{
    this.setState({
      orderTimeStart:dateString[0],
      orderTimeEnd:dateString[1]
    })
  }

  setOrderStatus=(value)=>{
    this.setState({orderStatus:value});
  }

  setShoper=(e)=>{
    this.setState({shopId:e.target.value});
  }

  setBuyer=(e)=>{
    this.setState({buyerId:e.target.value});
  }

  setOrdersn=(e)=>{
    this.setState({ordersn:e.target.value});
  }

  doSearch=()=>{
    let form = this.state;
    this.props.doSearch(form);
  }

  handleClean=()=>{
    this.setState({
      orderStatus:'',
      orderTimeStart:'',
      orderTimeEnd:'',
      ordersn:'',
      buyerId:'',
      shopId:''
    });

    this.props.cleanform();
  }

  handleActionClick=({ item, key, keyPath })=>{
    this.props.setorderstatus(key);
  }

  render() {
    const menu = (
      <Menu onClick={this.handleActionClick}>
				<Menu.Item key="1">等待付款</Menu.Item>
				<Menu.Item key="2">已付款</Menu.Item>
				<Menu.Item key="4">已发货</Menu.Item>
				<Menu.Item key="5">确认收货</Menu.Item>
				<Menu.Item key="8">已评价</Menu.Item>
        <Menu.Item key="9">交易完成</Menu.Item>
				<Menu.Item key="10">关闭交易</Menu.Item>
      </Menu>
		);
    return (
      <div>
        <Row gutter={16} className={style.searchbox}>
          <Col className="gutter-row" span={2}>
            <Select defaultValue="4" value={this.state.orderStatus} onChange={this.setOrderStatus}>
              <Option value="">所有</Option>
              <Option value="1">待付款</Option>
              <Option value="2">待发货</Option>
              <Option value='4'>待确认</Option>
              <Option value='5'>待评价</Option>
              <Option value="9">已完成</Option>
              <Option value="10">已关闭</Option>
            </Select>
          </Col>

          <Col className="gutter-row" span={4}>
            <DatePicker.RangePicker  onChange={this.setRangeDate} />
          </Col>

          <Col className="gutter-row" span={4} >
            <Input addonBefore="订单号" value={this.state.ordersn} onChange={this.setOrdersn}/>
          </Col>

          <Col className="gutter-row" span={3}>
            <Input addonBefore="买家" value={this.state.buyerId} onChange={e=>this.setBuyer(e)} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Input addonBefore="卖家" value={this.state.shopId} onChange={e=>this.setShoper(e)}/>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button className={style.actionbutton} onClick={this.doSearch} ghost type='primary'>搜索</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button className={style.actionbutton} onClick={this.handleClean} ghost type='primary'>清空</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Dropdown  overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                设置状态 <Icon type="down" />
              </Button>
						</Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OrderFilter;
