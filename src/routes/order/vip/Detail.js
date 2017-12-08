import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Detail extends Component {

  render() {

    const {ordersn, wxPrepayId, createTime, memo, memberName} = this.props.data;

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
        title="订单详情"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width="60%"
      >
        <Row type="flex" style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="用户">
              <p>{memberName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="订单编号">
              <p>{ordersn}</p>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="微信下单id">
              <p>{wxPrepayId}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="创建时间">
              <p>{createTime}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="留言">
              <p>{memo}</p>
            </FormItem>
          </Col>

        </Row>
      </Modal>
    );
  }
}

export default Detail;
