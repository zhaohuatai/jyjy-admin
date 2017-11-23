import React, {Component} from 'react';
import {Button, Col, Dropdown, Form, Icon, Input, Menu, Row, Select} from 'antd';
import {loadColumnChannelDataSet} from "../../../service/column";

const FormItem = Form.Item;

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search_form: {},
      channelList: [],
      recycleStr: true,
      defaultChannel: [],
    };
  }

  componentDidMount() {
    loadColumnChannelDataSet({rows: 100}).then(data => {
      this.setState({channelList: data.data.dataSet.rows})
      if (data.data.dataSet.rows) {
        this.setState({defaultChannel: data.data.dataSet.rows[0]['id']})
      }
    })
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
          <Col span={4} pull={10}>
            <FormItem>
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input addonBefore='标题' onPressEnter={() => this.handleActionClick({key: 'search'})}/>
              )}
            </FormItem>
          </Col>

          <Col span={4} pull={9}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('channelId')(
                <Select placeholder="选择专栏" style={{width: '190px'}}
                        onChange={() => this.handleActionClick({key: 'refresh'})}>
                  {
                    this.state.channelList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.title}</Select.Option>
                    })
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
              <Icon type="info-circle-o"/> {this.state.recycleStr ? "回收站" : "返回"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Filter);
