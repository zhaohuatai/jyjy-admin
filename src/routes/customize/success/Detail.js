import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Detail extends Component {

  render() {
    const {title, content} = this.props.data;

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
      <Modal title="详情" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              <p>{title}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="内容">
              <Collapse>
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

export default Detail
