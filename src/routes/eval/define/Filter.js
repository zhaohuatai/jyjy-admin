import React, {Component} from 'react';
import {Button, Col, Dropdown, Form, Icon, Input, Menu, Row, Select} from 'antd';
import {loadEvalCategoryList} from "../../../service/eval";
const Option = Select.Option;
const FormItem = Form.Item;

class Filter extends Component {
  //  触发操作
  handleActionClick = ({item, key, keyPath}) => {
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

  doSearch = () => {
    let form = this.props.form.getFieldsValue();
    this.props.doSearch(form);
  }


  componentDidMount() {
    loadEvalCategoryList().then(data=>{
      this.setState({categorys: data.data.evalCategoryList})
    })
  }


  constructor(props) {
    super(props);
    this.state = {
      search_form: {},
      categorys: []
    };
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const menu = (
      <Menu disabled={this.props.recycle} onClick={this.handleActionClick}>
        <Menu.Item key="update">更新</Menu.Item>
      </Menu>
    );

    const searchMenu = (
      <Menu onClick={this.handleActionClick}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="clean">清空</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Row type='flex' justify='end' style={{marginBottom: '5px'}}>
          <Col span={4} pull={14}>
            <FormItem>
              {getFieldDecorator('categroyId', {
                initialValue: '',
              })(
                <Select placeholder="选择类别" style={{width: '150px'}}>
                  <Select.Option key='0' value=''>选择类别</Select.Option>
                  {
                    this.state.categorys.map(item =>
                      <Select.Option key={item.id} value={`${item.id}`}>{item.title}</Select.Option>
                    )
                  }
                </Select>
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
              <Icon type="info-circle-o"/> {this.props.recycle ? "返回" : "回收站"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Filter);
