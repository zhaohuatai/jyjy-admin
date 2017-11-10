import React, { Component } from 'react';
import { Input, Col, Row, DatePicker, Button, Select, Dropdown, Menu, Icon} from 'antd';
import NewSysconifg from './NewSysconifg';
import style from './setting.scss';
import {createCategory} from '../../http';

const Option = Select.Option;

class SysconfigFilter extends Component {
  constructor(props){
    super(props);
    this.state={
        visible: false,
    };
  }

  handleActionClick=({ item, key, keyPath })=>{
    this.props.operation(key);
  }

  handleCancelNewCategory=()=>{
    this.setState({visible: false})
  }

  handleCreateNewCategory=()=>{
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      values.status = 1;
      values.parentId = 0;  //默认创建一级分类
      createCategory(values,data=>{
          console.log(data);
      })

      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const menu = (
      <Menu onClick={this.handleActionClick}>
        {/* <Menu.Item key="delete">删除</Menu.Item> */}
        <Menu.Item key="update">修改</Menu.Item>
      </Menu>
		);
    return (
      <div>
        <Row type='flex' justify='end' className={style.searchbox}>
          <Col span={2}>
            <Dropdown  overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                操作 <Icon type="down" />
              </Button>
		        </Dropdown>
          </Col>
        </Row>

        <NewSysconifg
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancelNewCategory}
          onCreate={this.handleCreateNewCategory}
        />
      </div>
    );
  }
}

export default SysconfigFilter;
