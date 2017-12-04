import React, {Component} from 'react';
import {API_DOMAIN} from '../../../utils/config';
import {Button, Col, Form, Icon, Input, message, Row, Upload} from 'antd';
import {createPubSlide} from '../../../service/slide';

const FormItem = Form.Item;

class New extends Component {

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    if (Object.prototype.toString.call(formData.imgUrl) === '[object Array]') {
      formData.imgUrl = formData.imgUrl[0].response.data.image;
    }

    createPubSlide(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return(
      <div>
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('title',{
                initialValue: '',
                rules: [
                  { required: true, message: '请输入标题' },
                ]
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="显示位置">
              {getFieldDecorator('location',{
                initialValue: '',
                rules: [
                  { required: true, message: '请输入显示位置id' },
                ]
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="图片">
              {getFieldDecorator('imgUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="file" action={`${API_DOMAIN}admin/pub/pubSlide/uploadImage`} listType="picture"
                        withCredentials={true}>
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="权重">
              {getFieldDecorator('showWeight', {
                initialValue: '',
              })(
                <Input type='number'/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: '',
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(New);
