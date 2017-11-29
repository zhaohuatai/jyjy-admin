import React, {Component} from 'react';
import {Button, Col, Dropdown, Form, Icon, Input, Menu, message, Row, Select} from 'antd';
import {
  loadEntranceCategoryFDataSet,
  loadEntranceCategorySDataSet,
  loadEntranceCategoryTDataSet
} from "../../../service/entrance";

const FormItem = Form.Item;

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search_form: {},
      cateAList: [],
      cateBList: [],
      cateCList: [],
    };
  }

  componentDidMount() {
    loadEntranceCategoryFDataSet({rows: 1000}).then(data => {
      this.setState({cateAList: data.data.dataSet.rows});
      if (data.data.dataSet.rows) {
        this.props.form.setFieldsValue({
          cateAList: data.data.dataSet.rows[0]['id'] + '',
        })
        this.props.doSearch(this.props.form.getFieldsValue());
      }
    }).catch((e) => {
      message.error(e);
    });

    loadEntranceCategorySDataSet({rows: 1000}).then(data => {
      this.setState({cateAList: data.data.dataSet.rows});
      if (data.data.dataSet.rows) {
        this.props.form.setFieldsValue({
          cateBList: data.data.dataSet.rows[0]['id'] + '',
        })
        this.props.doSearch(this.props.form.getFieldsValue());
      }
    }).catch((e) => {
      message.error(e);
    });

    loadEntranceCategoryTDataSet({rows: 1000}).then(data => {
      this.setState({cateAList: data.data.dataSet.rows});
      if (data.data.dataSet.rows) {
        this.props.form.setFieldsValue({
          cateCList: data.data.dataSet.rows[0]['id'] + '',
        })
        this.props.doSearch(this.props.form.getFieldsValue());
      }
    }).catch((e) => {
      message.error(e);
    })
  }

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
        this.setState({recycleStr: !this.state.recycleStr});
        this.props.doRecycle();
        break;
      default :
        break;
    }
  }

  doSearch = () => {
    let form = this.state;
    this.props.doSearch(form);
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };

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
          <Col span={4} pull={2}>
            <FormItem>
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input size='default' addonBefore='服务' onPressEnter={() => this.handleActionClick({key: 'search'})}/>
              )}
            </FormItem>
          </Col>

          <Col span={4} pull={1}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('cateFirstId', {
                onChange: (value) => {
                  this.props.form.setFieldsValue({
                    cateFirstId: value
                  });
                  this.handleActionClick({key: 'search'})
                }
              })(
                <Select placeholder="栏目1" style={{width: '150px'}}>{
                  this.state.cateAList.map(item =>
                    <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                  )
                }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={4} pull={1}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('cateSecondId', {
                onChange: (value) => {
                  this.props.form.setFieldsValue({
                    cateSecondId: value
                  });
                  this.handleActionClick({key: 'search'})
                }
              })(
                <Select placeholder="栏目2" style={{width: '150px'}}>{
                  this.state.cateBList.map(item =>
                    <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                  )
                }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={4} pull={1}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('cateThirdId', {
                onChange: (value) => {
                  this.props.form.setFieldsValue({
                    cateThirdId: value
                  });
                  this.handleActionClick({key: 'search'})
                }
              })(
                <Select placeholder="栏目3" style={{width: '150px'}}>{
                  this.state.cateCList.map(item =>
                    <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
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
            <Button onClick={() => {
              this.handleActionClick({key: 'recycle'});
            }
            }>
              <Icon type="info-circle-o"/> {this.props.recycle ? "返回" : "回收站"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Filter);
