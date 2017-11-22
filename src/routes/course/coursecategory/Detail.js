import React, {Component} from 'react';
import {Form, Col, Row, Modal, Collapse, Switch} from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class New extends Component {

  render() {
    const {
      categoryName, remark, showIndex
    } = this.props.data;

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
        marginBottom: '8px',
      },
    };

    return (
      <Modal
        title="详情"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width="80%"
      >
        <Row type="flex" style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="分类名"
            >
              <p>{categoryName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="显示顺序"
            >
              <p>{showIndex}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              <p>{remark}</p>
            </FormItem>
          </Col>

        </Row>
      </Modal>
    );
  }
}

export default New;
