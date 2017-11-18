import React, {Component} from 'react';
import {Form, Col, Row, Button, Select, Dropdown, Menu, Icon, Input} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_form: {}
    };
  }

  doSearch = () => {
    let form = this.state;
    this.props.doSearch(form);
  }

  // 清空搜索条件
  handleClean = () => {
    this.props.cleanform();
  }

  //  触发操作
  handleActionClick = ({item, key, keyPath}) => {
    console.log(key);
    switch (key) {
      case 'clean' :
        this.props.form.resetFields();
        break;
      case 'search' :
        this.props.doSearch(this.props.form.getFieldsValue());
        break;
      case 'refresh' :
        this.props.doRefresh();
        break;
      case 'delete' :
        this.props.doDelete();
        break;
      case 'update' :
        this.props.doUpdate();
        break;
      case 'recycle' :
        this.props.doRecycle();
        break;
      default :
        break;
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const menu = (
      <Menu onClick={this.handleActionClick}>
        <Menu.Item key="delete">删除</Menu.Item>
        <Menu.Item key="update">更新</Menu.Item>
      </Menu>
    );

    const searchMenu = (
      <Menu onClick={this.handleActionClick}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="clean">清空</Menu.Item>
      </Menu>
    )

    return (
      <div>
        <Row type='flex' justify='end' style={{marginBottom: '5px'}}>
          <Col span={4} pull={14}>
            <FormItem>
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input addonBefore='标题' size='default'/>
              )}
            </FormItem>
          </Col>

          <Col span={2}>
            <Dropdown.Button onClick={() => this.handleActionClick({key: 'search'})} overlay={searchMenu}>
              搜索
            </Dropdown.Button>
          </Col>

          <Col span={2}>
            <Dropdown overlay={menu}>
              <Button>
                操作 <Icon type="down"/>
              </Button>
            </Dropdown>
          </Col>

          <Col span={2}>
            <Button onClick={() => this.handleActionClick({key: 'recycle'})}>
              <Icon type="info-circle-o"/> 回收站
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Filter);
