import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row, Select} from 'antd';
import {loadEnrollAutoQuestionCategoryDataSet} from '../../../service/autoSelf';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    }
  }


  componentDidMount() {
    loadEnrollAutoQuestionCategoryDataSet({rows: 10000}).then(data => {
      this.setState({category: data.data.dataSet.rows})
    })
  }

  render() {
    const { content, title, categoryName} = this.props.data;

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
      <Modal title="高校信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="问题">
              <p>{title}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所属分类">
              <p>{categoryName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="问题内容"
            >
              <Collapse defaultActiveKey={['1']}>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{__html: content}}/>
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default Form.create()(New);