import React, { Component } from 'react';
import { Input, Col, Row, DatePicker, Button, Select, Dropdown, Menu, Icon} from 'antd';
import NewCategory from './NewCategory';
import style from './category.scss';
import {createCategory} from '../../http';

const Option = Select.Option;

class CategoryFilter extends Component {
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
        <Menu.Item key="delete">删除</Menu.Item>
        <Menu.Item key="disable">禁用</Menu.Item>
        <Menu.Item key="enable">启用</Menu.Item>
      </Menu>
		);
    return (
      <div>
        <Row gutter={16} className={style.searchbox}>
          {/*<Col className="gutter-row" span={2}>
            <Button className={style.actionbutton} onClick={()=>this.setState({visible: true})} ghost type='primary'>新建</Button>
          </Col>*/}
          <Col className="gutter-row" span={2}>
            <Dropdown  overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                操作 <Icon type="down" />
              </Button>
		  </Dropdown>
          </Col>
        </Row>

        <NewCategory
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancelNewCategory}
          onCreate={this.handleCreateNewCategory}
        />
      </div>
    );
  }
}

export default CategoryFilter;
