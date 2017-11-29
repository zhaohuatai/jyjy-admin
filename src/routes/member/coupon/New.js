import React, {Component} from 'react';
import {API_DOMAIN} from '../../../utils/config';
import {Button, Col, Form, Icon, Input, message, Row, Upload} from 'antd';
import {createCoupon} from '../../../service/coupon';

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    if (formData.mainImage) {
      formData.mainImage = formData.mainImage[0].response.data.image;
    } else {
      formData.mainImage = ''
    }

    if (formData.thumbNailImage) {
      formData.thumbNailImage = formData.thumbNailImage[0].response.data.image;
    } else {
      formData.thumbNailImage = ''
    }

    formData.status = '1';

    console.log(formData);

    createCoupon(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };

    return (
      <div>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="名称">
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {required: true, message: '名称'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="兑换积分">
              {getFieldDecorator('changePoints', {
                initialValue: '',
                rules: [
                  {required: true, message: '兑换积分'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="面值">
              {getFieldDecorator('faceValue', {
                initialValue: '',
                rules: [
                  {required: true, message: '面值'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="缩略图"
            >
              {getFieldDecorator('thumbNailImage', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/coupon/coupon/uploadThumbImage`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="券图"
            >
              {getFieldDecorator('mainImage', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/coupon/coupon/uploadImage`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
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