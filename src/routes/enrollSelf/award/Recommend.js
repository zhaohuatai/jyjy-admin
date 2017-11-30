import React, {Component} from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Icon,
  Input,
  Menu,
  message,
  Modal,
  Pagination,
  Row,
  Select,
  Table
} from 'antd';
import {
  createEnrollAutoAwardRecommend,
  deleteEnrollAutoAwardRecommend,
  loadEnrollautoAwardCompetitionDataSet,
  loadEnrollAutoAwardEvaluationDataSet,
  loadEnrollAutoAwardRecommendDataSet
} from "../../../service/award";

class Category extends Component {
  handleActionClick = ({key, record}) => {
    switch (key) {
      case 'clean' :
        this.props.form.resetFields();
        break;
      case 'search' :
        this.doSearch({
          name: this.props.form.getFieldsValue()['name'],
          competitionId: this.props.form.getFieldsValue()['competitionId'],
        });
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
  doRefresh = (params) => {
    this.setState({table_loading: true});
    params = {...params};
    params['status'] = (this.state.recycle ? 2 : 1);
    loadEnrollAutoAwardRecommendDataSet(params).then(data => {
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
    Modal.confirm({
      title: `确定删除吗？`,
      okType: 'danger',
      onOk: () => {
        deleteEnrollAutoAwardRecommend({id: record.id}).then(data => {
          message.success("删除成功！");
          this.doRefresh();
        });
      }
    })
  };
  doAdd = () => {
    createEnrollAutoAwardRecommend({
      university: this.props.form.getFieldsValue()['add'],
      awardId: this.props.form.getFieldsValue()['add_awardId'],
      competitionId: this.props.form.getFieldsValue()['add_competitionId'],
    }).then(data => {
      message.success("添加成功！");
      this.props.form.resetFields(['add', 'add_awardId', 'add_competitionId']);
      this.doRefresh();
    });
  };
  handleGetAward = (params) => {
    console.log(params);
    loadEnrollAutoAwardEvaluationDataSet(params).then(data => {
      this.setState({award: data.data.dataSet.rows})
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      table_loading: false,
      dataSet: [],
      search_form: {},
      table_cur_page: 1,
      table_total: 0,
      recycle: false,
      competition: [],
      award: []
    };
  }

  componentDidMount() {
    this.doRefresh();
    loadEnrollautoAwardCompetitionDataSet().then(data => {
      this.setState({competition: data.data.dataSet.rows})
    })
  }

  render() {
    const {table_loading, table_cur_page, table_total} = this.state;

    const {getFieldDecorator} = this.props.form;

    const table_columns = [
      {title: '序号', dataIndex: 'id', key: 'id'},
      {title: '分类名称', dataIndex: 'university', key: 'university'},
      {title: '分类', dataIndex: 'category', key: 'category'},
      {title: '竞赛', dataIndex: 'competition', key: 'competition'},
      {title: '级别', dataIndex: 'award', key: 'award'},
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
            <Col span={4} pull={14}>
              <Form.Item>
                {getFieldDecorator('name', {
                  initialValue: ''
                })(
                  <Input size='default' addonBefore='大学名称'
                         onPressEnter={() => this.handleActionClick({key: 'search'})}/>
                )}
              </Form.Item>
            </Col>
            <Col span={2} pull={14}>
              <Form.Item>
                {getFieldDecorator('competitionId',)(
                  <Select placeholder="请选择竞赛" style={{width: '200px'}}>
                    <Select.Option key='0' value=''>选择竞赛-空</Select.Option>
                    {
                      this.state.competition.map(item => {
                        return <Select.Option key={item.id} value={`${item.id}`}>{item.competition}</Select.Option>
                      })
                    }
                  </Select>
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
                  <Form.Item
                    label='选择竞赛'
                  >
                    {getFieldDecorator('add_competitionId',)(
                      <Select placeholder="请选择竞赛" style={{width: '200px'}}
                              onChange={(value) => this.handleGetAward({competitionId: value})}>
                        {
                          this.state.competition.map(item => {
                            return <Select.Option key={item.id} value={`${item.id}`}>{item.competition}</Select.Option>
                          })
                        }
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item
                    label='选择奖项'
                  >
                    {getFieldDecorator('add_awardId',)(
                      <Select placeholder="请选择级别" style={{width: '200px'}}>
                        {
                          this.state.award.map(item => {
                            return <Select.Option key={item.id} value={`${item.id}`}>{item.award}</Select.Option>
                          })
                        }
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item>
                    {getFieldDecorator('add', {
                      initialValue: ''
                    })(
                      <Input addonBefore='名称'/>
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
