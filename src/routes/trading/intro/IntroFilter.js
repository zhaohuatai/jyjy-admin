import React, { Component } from 'react';
import { Input, Col, Row, DatePicker, Button, Select, Dropdown, Menu, Icon} from 'antd';
import style from './intro.scss';

const Option = Select.Option;

class DepositFilter extends Component {
  constructor(props){
    super(props);
    this.state={
      orderStatus:'',
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
      payStatus:'',
      orderTimeStart:'',
      orderTimeEnd:'',
      memberId:'',
      productId:'',
      transactionNo:''
    });

    this.props.cleanform();
  }

  handleActionClick=({ item, key, keyPath })=>{
    this.props.setorderstatus(key);
  }

  render() {
    const menu = (
      <Menu onClick={this.handleActionClick}>
				<Menu.Item key="delete">删除</Menu.Item>
      </Menu>
		);
    return (
      <div>
        <Row gutter={16} className={style.searchbox}>
          <Col className="gutter-row" span={2}>
            <Select defaultValue="" value={this.state.orderStatus} onChange={this.setOrderStatus}>
              <Option value="">所有</Option>
              <Option value="0">已删除</Option>
            </Select>
          </Col>
          
          <Col className="gutter-row" span={5}>
            <DatePicker.RangePicker  onChange={this.setRangeDate} />
          </Col>
          
          <Col className="gutter-row" span={3}>
            <Input addonBefore="用户id" value={this.state.buyerId} onChange={e=>this.setBuyer(e)} />
          </Col>

          <Col className="gutter-row" span={2} offset={7}>
            <Button className={style.actionbutton} onClick={this.doSearch} ghost type='primary'>搜索</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button className={style.actionbutton} onClick={this.handleClean} ghost type='primary'>清空</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Dropdown  overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                操作 <Icon type="down" />
              </Button>
						</Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DepositFilter;