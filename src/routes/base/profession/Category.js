import React, {Component} from 'react';
import {Col, Form, Pagination, Row, Table} from 'antd';
import {loadDataProfessionCategoryDataSet} from "../../../service/base";

const table_columns = [
  {title: '序号', dataIndex: 'id', key: 'id'},
  {title: '类别', dataIndex: 'name', key: 'name'},
]

class Category extends Component {

  handleRefresh = (params) => {
    this.setState({table_loading: true});
    loadDataProfessionCategoryDataSet(params).then(data => {
      this.setState({dataSet: data.data.dataSet.rows, table_total: data.data.dataSet.total, table_loading: false})
    })
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
    };
  }

  componentDidMount() {
    this.handleRefresh({status: this.state.recycle_data ? 2 : 1});
  }

  render() {
    const {table_loading, table_cur_page, table_total} = this.state;

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

    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}} width={'50%'}>
        <Row type='flex'>
          <Col span={18}>
            <Table dataSource={this.state.dataSet} columns={table_columns} pagination={false}
                   rowKey={record => record.id + ''} loading={table_loading}/>
            <Pagination style={{marginTop: '10px'}} defaultCurrent={1} current={table_cur_page} defaultPageSize={20}
                        total={table_total} onChange={this.onChangeTablePage}/>
          </Col>
          <Col span={6}>
            <Table dataSource={this.state.dataSet} columns={table_columns} pagination={false}
                   rowKey={record => record.id + ''} loading={table_loading}/>
            <Pagination style={{marginTop: '10px'}} defaultCurrent={1} current={table_cur_page} defaultPageSize={20}
                        total={table_total} onChange={this.onChangeTablePage}/>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Form.create()(Category);
