import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row} from 'antd';
import {doAppointmentReturn} from "../../../service/member";

const {TextArea} = Input;
const FormItem = Form.Item;

class New extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      id: this.props.data.id,
    }

    doAppointmentReturn(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新状态成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      returnResult
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
    };

    return (
      <Modal title="回访结束" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="回访结果">
              {getFieldDecorator('returnResult', {
                initialValue: returnResult
              })(
                <TextArea autosize/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);
