import React, { Component } from 'react';
import { Input, Col, Row, DatePicker, Button, Select, Dropdown, Menu, Icon, Switch} from 'antd';
import style from './product.scss';

const Option = Select.Option;

class ProductFilter extends Component {
  constructor(props){
    super(props);
    this.state={
      productStatusList:'',
      productTimeStart:'',
      productTimeEnd:'',
      age:'',
      author:'',
      shopId:'',
      deliveryType:'',
      isHot:''
    };
  }

  setRangeDate=(date, dateString)=>{
    this.setState({
      productTimeStart:dateString[0],
      productTimeEnd:dateString[1]
    })
  }

  doSearch=()=>{
    let form = this.state;
    this.props.doSearch(form);
  }

  handleClean=()=>{
    this.setState({
      productStatusList:'',
      productTimeStart:'',
      productTimeEnd:'',
      keyword:'',
      author:'',
      shopId:'',
      deliveryType:'',
      isHot:''
    });

    this.props.cleanform();
  }

  handleStatusClick=({ item, key, keyPath })=>{
    this.props.setorderstatus(key);
  }

  handleActionClick=({ item, key, keyPath })=>{
    this.props.setorderstatus(key);
  }

  render() {
    const actionmenu = (
      <Menu onClick={({key})=>this.props.action(key)}>
				<Menu.Item key="ishot">设置热门</Menu.Item>
				<Menu.Item key="nothot">取消热门</Menu.Item>
				<Menu.Item key="checksuccess">审核通过</Menu.Item>
        <Menu.Item key="checkfail">审核不通过</Menu.Item>
        <Menu.Item key="offshelf">下架商品</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Row gutter={16} type="flex" className={style.searchbox}>
          <Col span={2}>
            <Select defaultValue="" value={this.state.productStatusList} onChange={(value)=>this.setState({productStatusList:value})}>
              <Option value="">所有</Option>
              <Option value="1">正常</Option>
              <Option value="2">已删除</Option>
              <Option value="3">已下架</Option>
              <Option value='4'>申请上架</Option>
              <Option value='5'>拒接上架</Option>
              <Option value="6">审核通过</Option>
              <Option value="7">已售出</Option>
            </Select>
          </Col>
{/*
          <Col className="gutter-row" span={5}>
            <DatePicker.RangePicker  onChange={this.setRangeDate} />
          </Col>
          */}
          <Col span={3}>
            <Input addonBefore="关键词" value={this.state.keyword} onChange={e=>this.setState({keyword:e.target.value})}/>
          </Col>
          {/*
          <Col className="gutter-row" span={3}>
            <Input addonBefore="作家" value={this.state.author} onChange={e=>this.setState({author:e.target.value})} />
          </Col>
          */}
          {/*
            <Col className="gutter-row" span={3}>
              <Input addonBefore="年代" value={this.state.age} onChange={e=>this.setState({age:e.target.value})}/>
            </Col>
          */}

          <Col  span={3}>
            <Input addonBefore="发布者" value={this.state.shopId} onChange={e=>this.setState({shopId:e.target.value})}/>
          </Col>
{/*
          <Col className="gutter-row" span={4}>
            <Select defaultValue="" value={this.state.deliveryType} onChange={(value)=>this.setState({deliveryType:value})}>
              <Option value="">交货方式</Option>
              <Option value="3">面交</Option>
              <Option value="1">快递</Option>
            </Select>
          </Col>
          */}
        </Row>


        <Row gutter={16} className={style.searchbox} type="flex" justify="end" >
          <Col span={1} >
            <Button  onClick={this.doSearch} ghost type='primary'>搜索</Button>
          </Col>
          <Col span={1}>
            <Button  onClick={this.handleClean} ghost type='primary'>清空</Button>
          </Col>
          <Col  span={2}>
            <Dropdown  overlay={actionmenu}>
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

export default ProductFilter;
