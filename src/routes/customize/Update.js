import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row} from 'antd';
import UEditor from '../../components/editor/UEditor';
import {updatePubCustomize} from "../../service/customize";
import LazyLoad from 'react-lazyload';


const FormItem = Form.Item;

class New extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = { ...formData,
      update_courseContent: UE.getEditor('update_customizeContent').getContent(),
    };

    formData.id = this.props.data.id;

    updatePubCustomize(formData).then(data => {
      this.props.form.resetFields();
      this.props.oncancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { title, content } = this.props.data;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return(
      <Modal
        title="更新"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width={'80%'}
      >
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title',{
                initialValue: title,
                rules: [
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              <LazyLoad once>
                <UEditor id="update_customizeContent" height="200" initValue={content}/>
              </LazyLoad>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          wrapperCol={{ span: 12, offset: 4 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);;
