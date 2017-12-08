import React, {Component} from 'react';
import {Button, Col, Dropdown, Form, Icon, Input, Menu, Row, Select, DatePicker} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_form: {
        orderStatusList: '',
        orderStartTime: '',
        orderEndTime: '',
      }
    };
  }

  doSearch = () => {
    let form = this.state.search_form;
    this.props.doSearch(form);
  }

  //  触发操作
  handleActionClick = ({item, key, keyPath}) => {
    switch (key) {
      case 'clean' :
        this.setState({search_form: {orderStatusList: '', orderStartTime: '', orderEndTime: ''}});
        break;
      case 'search' :
        this.props.doSearch(this.state.search_form);
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
      default :
        break;
    }
  }

  setRangeDate = (date, dateString) => {
    this.setState({
      search_form: {
        ...this.state.search_form,
        orderStartTime: dateString[0],
        orderEndTime: dateString[1]
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const menu = (
      <Menu disabled={this.props.recycle} onClick={this.handleActionClick}>
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
          <Col span={4} pull={11}>
            <Select
              defaultValue=""
              onChange={(value) =>
                this.setState({
                    search_form: {...this.state.search_form, orderStatusList: value}
                  }
                )}
              style={{width: '100px'}}
            >
              <Option value="">所有</Option>
              <Option value="1">等待付款</Option>
              <Option value="2">已完成</Option>
              <Option value='3'>退款中</Option>
              <Option value="4">交易关闭</Option>
            </Select>
          </Col>

          <Col span={5} pull={12}>
            <DatePicker.RangePicker onChange={this.setRangeDate}/>
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
        </Row>
      </div>
    );
  }
}

export default Form.create()(Filter);
