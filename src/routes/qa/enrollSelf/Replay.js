import React, {Component} from 'react';
import {Button, Col, Form, message, Modal, Row} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {answerConsultation} from "../../../service/interlocution";

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      onlineReply: UE.getEditor('replay_consultation').getContent(),
      status: 1,
      id: this.props.data.id,
    }

    answerConsultation(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("回复成功！");
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      category: []
    }
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const { consultorName, content, phone, onlineReply, remark} = this.props.data;

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
      <Modal title="在线回复" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              <p>{consultorName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              <p>{content}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="电话"
            >
              <p>{phone}</p>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="回答">
              <UEditor id="replay_consultation" initValue={onlineReply}/>
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
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);
