import React, { Component } from 'react';
import { Input, Col, Row, DatePicker, Button, Select, Dropdown, Menu, Icon} from 'antd';
import style from './user.scss';

const Option = Select.Option;

class UserFilter extends Component {
  constructor(props){
    super(props);
    this.state={
      status:'',
      orderTimeStart:'',
      orderTimeEnd:'',
      phone:'',
      nickName:'',
      name:'',
      sex:''
    };
  }

  setRangeDate=(date, dateString)=>{
    this.setState({
      orderTimeStart:dateString[0],
      orderTimeEnd:dateString[1]
    })
  }

  setStatus=(value)=>{
    this.setState({status:value});
  }

  setPhone=(e)=>{
    this.setState({phone:e.target.value});
  }

  setNickName=(e)=>{
    this.setState({nickName:e.target.value});
  }

  setName=(e)=>{
    this.setState({name:e.target.value});
  }

  setSex=(value)=>{
    this.setState({sex:value});
  }

  doSearch=()=>{
    let form = this.state;
    this.props.doSearch(form);
  }

  handleClean=()=>{
    this.setState({
      status:'',
      orderTimeStart:'',
      orderTimeEnd:'',
      phone:'',
      nickName:'',
      name:'',
      sex:''
    });

    this.props.cleanform();
  }

  handleActionClick=({ item, key, keyPath })=>{
    this.props.setorderstatus(key);
  }

  render() {
    const menu = (
      <Menu onClick={this.handleActionClick}>
				<Menu.Item key="1">正常</Menu.Item>
				<Menu.Item key="2">验证码通过</Menu.Item>
				<Menu.Item key="3">注册完成</Menu.Item>
				<Menu.Item key="4">审核通过</Menu.Item>
				<Menu.Item key="5">禁用</Menu.Item>
        <Menu.Item key="6">删除</Menu.Item>
      </Menu>
		);
    return (
      <div>
        <Row gutter={16} className={style.searchbox}>
          <Col span={2}>
            <Select defaultValue="4" value={this.state.status} onChange={this.setStatus} style={{width:'80px'}}>
              <Option value="">所有</Option>
              <Option value="1">正常</Option>
              <Option value="2">验证码通过</Option>
              <Option value='3'>注册完成</Option>
              <Option value='4'>审核通过</Option>
              <Option value="5">禁用</Option>
              <Option value="6">删除</Option>
            </Select>
          </Col>
 {/*
          <Col className="gutter-row" span={5}>
            <DatePicker.RangePicker  onChange={this.setRangeDate} />
          </Col>
          */}
         {/*
          <Col className="gutter-row" span={3}>
            <Input addonBefore="推荐码" />
          </Col>
          */}
          <Col className="gutter-row" span={4} >
            <Input addonBefore="电话" value={this.state.phone} onChange={e=>this.setPhone(e)}/>
          </Col>
{/*
          <Col className="gutter-row" span={3}>
            <Input addonBefore="昵称" value={this.state.nickName} onChange={e=>this.setNickName(e)} />
          </Col>
          */}
          <Col className="gutter-row" span={3}>
            <Input addonBefore="姓名" value={this.state.name} onChange={e=>this.setName(e)}/>
          </Col>
           {/*
             <Col className="gutter-row" span={4}>
               <Select defaultValue="" value={this.state.sex} onChange={this.setSex}>
                 <Option value="">性别(所有)</Option>
                 <Option value="1">男</Option>
                 <Option value="0">女</Option>
               </Select>
             </Col>
             */}

        </Row>

        <Row type='flex' justify='end'>
          <Col span={1} >
            <Button className={style.actionbutton} onClick={this.doSearch} ghost type='primary'>搜索</Button>
          </Col>
          <Col span={1}>
            <Button className={style.actionbutton} onClick={this.handleClean} ghost type='primary'>清空</Button>
          </Col>
          <Col span={2}>
            <Dropdown  overlay={menu}>
              <Button >
                设置状态 <Icon type="down" />
              </Button>
						</Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserFilter;
