import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {updateCaseSuccess} from "../../../service/customize";
import LazyLoad from 'react-lazy-load';

const FormItem = Form.Item;

class Update extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      id: this.props.data.id,
      content: UE.getEditor('update_caseContent').getContent(),
    };

    updateCaseSuccess(formData).then(data => {
      this.props.form.resetFields();
      this.props.oncancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
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
    };

    return (
      <Modal title="更新" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [{
                  require: true
                }]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="update_caseContent" initValue={content}/>
              </LazyLoad>
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

export default Form.create()(Update);