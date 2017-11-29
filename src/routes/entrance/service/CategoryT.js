import React, {Component} from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  message,
  Pagination,
  Row,
  Switch,
  Table
} from 'antd';
import {
  createServiceEntranceCateFirst,
  deleteServiceEntranceCateFirst,
  loadEntranceCategoryFDataSet,
  setEntranceCateFirstIsTop,
  setEntranceCateFirstShowIndex
} from "../../../service/entrance";

class CategoryT extends Component {

  handleActionClick = ({key, id}) => {
    switch (key) {
      case 'clean' :
        this.props.form.resetFields();
        break;
      case 'search' :
        this.doSearch(this.props.form.getFieldsValue());
        break;
      case 'refresh' :
        this.doRefresh();
        break;
      case 'delete' :
        this.doDelete(id);
        break;
      case 'recycle' :
        this.doRecycle();
        break;
      case 'add' :
        this.doAdd();
        break;
      default :
        break;
    }
  };
  doRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadEntranceCategoryFDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    }).catch((e) => {
      message.error(e);
    })
  };
  onChangeTablePage = (currentPage) => {
    this.setState({table_loading: true, table_cur_page: currentPage});
    let searchForm = this.state.search_form;
    searchForm['page'] = currentPage;
    this.doRefresh(searchForm)
  };
  doRecycle = () => {
    this.setState({recycle: !this.state.recycle}, () => {
      this.doRefresh();
    });
  };
  doSearch = (values) => {
    this.setState({table_cur_page: 1});
    this.doRefresh(values);
  };
  doDelete = (record) => {
    confirm({
      title: `确定删除${record.name}吗？`,
      okType: 'danger',
      onOk: () => {
        deleteServiceEntranceCateFirst({id: record.id}).then(data => {
          message.success("删除成功！");
          this.doRefresh();
        }).catch((e) => {
          message.error(e);
        })
      }
    })
  };
  doChecked = (record) => {
    setEntranceCateFirstIsTop({id: record.id, isTop: record.checked ? 1 : 0}).then(data => {
      this.doRefresh();
      message.success(`${record.name}更新为${record.isTop ? '' : '不'}置顶！`);
    }).catch((e) => {
      message.error(e);
    })
  };
  doChange = (record) => {
    setEntranceCateFirstShowIndex({id: record.id, showIndex: record.showIndex}).then(data => {
      this.doRefresh();
      message.success(`${record.name}显示次序更新为${record.showIndex}！`);
    }).catch((e) => {
      message.error(e);
    })
  };
  doAdd = () => {
    createServiceEntranceCateFirst({name: this.props.form.getFieldsValue()['add']}).then(data => {
      message.success("添加成功！");
      this.props.form.resetFields(['add']);
      this.doRefresh();
    }).catch((e) => {
      message.error(e);
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      table_loading: false,
      dataSet: [],
      search_form: {},
      table_cur_page: 1,
      table_total: 0,
      recycle: false,
    };
  }

  componentDidMount() {
    this.doRefresh();
  }

  render() {
    const {table_loading, table_cur_page, table_total} = this.state;

    const {getFieldDecorator} = this.props.form;

    const table_columns = [
      {title: '序号', dataIndex: 'id', key: 'id'},
      {title: '栏目', dataIndex: 'name', key: 'name'}, {
        title: '置顶', dataIndex: 'isTop', key: 'isTop', render: (text, record) => {
          return (
            <Switch checked={!!text} checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}
                    onChecked={this.doChecked(record)}/>
          )
        }
      }, {
        title: '显示次序', dataIndex: 'showIndex', key: 'showIndex', render: (text, record) => {
          return (
            <InputNumber min={1} defaultValue={text} onChange={this.doChange(record)}/>
          )
        }
      }, {
        title: '操作', key: 'action', render: (text, record) => {
          return (<Col span={4}>
            <Button shape="circle" type='danger' icon='minus' size='small'
                    onClick={() => this.handleActionClick({key: 'delete', record: record})}/>
          </Col>)
        }
      }
    ];

    const searchMenu = (
      <Menu onClick={this.handleActionClick}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="clean">清空</Menu.Item>
      </Menu>
    );

    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}} width={'50%'}>
        <div>
          <Row type='flex' justify='end' gutter={8} style={{marginBottom: '5px'}}>
            <Col span={4} pull={16}>
              <Form.Item>
                {getFieldDecorator('name', {
                  initialValue: ''
                })(
                  <Input size='default' addonBefore='栏目' onPressEnter={() => this.handleActionClick({key: 'search'})}/>
                )}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Dropdown.Button onClick={() => this.handleActionClick({key: 'search'})} overlay={searchMenu}>
                搜索
              </Dropdown.Button>
            </Col>
            <Col span={2}>
              <Button onClick={() => this.handleActionClick({key: 'recycle'})}>
                <Icon type="info-circle-o"/> {this.state.recycle ? "返回" : "回收站"}
              </Button>
            </Col>
          </Row>
        </div>
        <Row type='flex'>
          <Col span={16}>
            <Table dataSource={this.state.dataSet} columns={table_columns} pagination={false}
                   rowKey={record => record.id + ''} loading={table_loading}/>
            <Pagination style={{marginTop: '10px'}} defaultCurrent={1} current={table_cur_page} defaultPageSize={20}
                        total={table_total} onChange={this.onChangeTablePage}/>
          </Col>
          <Col span={7} push={1}>
            <Card title="添加">
              <Row type='flex'>
                <Col span={18}>
                  <Form.Item>
                    {getFieldDecorator('add', {
                      initialValue: ''
                    })(
                      <Input addonBefore='栏目'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={2} push={2}>
                  <Button onClick={() => this.handleActionClick({key: 'add'})}>
                    添加
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(CategoryT);
