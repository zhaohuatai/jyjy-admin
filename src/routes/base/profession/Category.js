import React, {Component} from 'react';
import {Button, Card, Col, Dropdown, Form, Icon, Input, Menu, message, Pagination, Row, Table} from 'antd';
import {
  createDataProfessionCategory,
  deleteDataProfessionCategory,
  loadDataProfessionCategoryDataSet
} from "../../../service/base";

class Category extends Component {

  handleActionClick = ({key, record}) => {
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
        this.doDelete(record);
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

  doRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadDataProfessionCategoryDataSet(params).then(data => {
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
        deleteDataProfessionCategory({id: record.id}).then(data => {
          message.success("删除成功！");
          this.doRefresh();
        });
      }
    })
  };
  doAdd = () => {
    createDataProfessionCategory({name: this.props.form.getFieldsValue()['add']}).then(data => {
      message.success("添加成功！");
      this.props.form.resetFields(['add']);
      this.doRefresh();
    });
  };

  componentDidMount() {
    this.doRefresh();
  }

  render() {
    const {table_loading, table_cur_page, table_total} = this.state;

    const {getFieldDecorator} = this.props.form;

    const table_columns = [
      {title: '序号', dataIndex: 'id', key: 'id'},
      {title: '门类', dataIndex: 'name', key: 'name'},
      {
        title: '操作', key: 'action', render: (text, record) => {
        return (<span>
                  <Button shape="circle" type='danger' icon='minus' size='small'
                          onClick={() => this.handleActionClick({key: 'delete', record: record})}/>
                </span>)
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
                  <Input size='default' addonBefore='门类' onPressEnter={() => this.handleActionClick({key: 'search'})}/>
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
                      <Input addonBefore='门类'/>
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

export default Form.create()(Category);
