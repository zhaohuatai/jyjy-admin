import React, {Component} from 'react';
import {Button, Col, Dropdown, Icon, Menu, Row, Select} from 'antd';

const Option = Select.Option;

class Filter extends Component {
  constructor(props){
    super(props);
    this.state={
        visible: false,
    };
  }

  handleActionClick=({ item, key, keyPath })=>{
    this.props.operation(key);
  }

  render() {
    const menu = (
      <Menu disabled={this.props.recycle} onClick={this.handleActionClick}>
        <Menu.Item key="update">修改</Menu.Item>
      </Menu>
		);
    return (
      <div>
        <Row type='flex' justify='end' style={{marginBottom: '5px'}}>
          <Col span={2}>
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

export default Filter;
