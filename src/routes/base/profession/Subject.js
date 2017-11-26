import React, {Component} from 'react';
import {Button, Col, Dropdown, Form, Icon, Input, Menu, Pagination, Row, Table} from 'antd';
import {loadDataProfessionSubjectDataSet} from "../../../service/base";

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '类别', dataIndex: 'name', key: 'name'},
  {
    title: '操作', key: 'action', render: (text, record) => (
    <span>
      <Button shape="circle" icon='minus'/>
    </span>
  )
  }
]

class Subject extends Component {

  handleRefresh = (params) => {
    this.setState({table_loading: true});
    loadDataProfessionSubjectDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    })
  }

  componentDidMount() {
    this.handleRefresh({status: this.state.recycle_data ? 2 : 1});
  }
  onChangeTablePage = (currentPage) => {
    this.setState({table_loading: true, table_cur_page: currentPage});
    let searchForm = this.state.search_form;
    searchForm['page'] = currentPage;
    searchForm['status'] = (this.state.recycle_data ? 2 : 1);
    this.handleRefresh(searchForm)
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
    };
  }

  render() {
    const {table_loading, table_cur_page, table_total} = this.state;

    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
      style: {
        marginBottom: '8px'
      }
    };

    const searchMenu = (
      <Menu onClick={this.handleActionClick}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="clean">清空</Menu.Item>
      </Menu>
    )

    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}} width={'50%'}>
        <div>
          <Row type='flex' justify='end' gutter={8} style={{marginBottom: '5px'}}>
            <Col span={4} pull={16}>
              <Form.Item>
                {getFieldDecorator('name', {
                  initialValue: ''
                })(
                  <Input size='default' addonBefore='科目' onPressEnter={() => this.handleActionClick({key: 'search'})}/>
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
          <Col span={12}>
            <Table dataSource={this.state.dataSet} columns={table_columns} pagination={false}
                   rowKey={record => record.id + ''} loading={table_loading}/>
            <Pagination style={{marginTop: '10px'}} defaultCurrent={1} current={table_cur_page} defaultPageSize={20}
                        total={table_total} onChange={this.onChangeTablePage}/>
          </Col>
          <Col span={12}>

          </Col>
        </Row>
      </div>
    );
  }

}

export default Form.create()(Subject);
