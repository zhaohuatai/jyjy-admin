import React, {Component} from 'react';
import {Button, Col, Dropdown, Icon, Menu, Row, Select} from 'antd';
import style from './menu.scss';

const Option = Select.Option;

class ProductFilter extends Component {
  constructor(props){
    super(props);
    this.state={
      
    };
  }

  render() {
    const actionmenu = (
      <Menu onClick={({key})=>this.props.action(key)}>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );
    
    return (
      <div>
        <Row gutter={16} justify="end" type="flex" className={style.searchbox} >
          <Col className="gutter-row" span={2}>
            <Button onClick={()=>this.props.doRefresh()} ghost type='primary'>刷新</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={()=>this.props.doAdd()} ghost type='primary'>添加</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Dropdown  overlay={actionmenu}>
              <Button>
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