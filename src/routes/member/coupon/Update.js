import React, {Component} from 'react';
import {API_DOMAIN} from '../../../utils/config';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Switch, Upload} from 'antd';
import {up} from "../../../service/coupon";

const FormItem = Form.Item;

class Update extends Component {

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      id: this.props.data.id,
      isEnabled: formData.isEnabled ? 0 : 1,
    };

    if (Object.prototype.toString.call(formData.mainImage) === '[object Array]') {
      formData.mainImage = formData.mainImage[0].response.data.image;
    }

    if (formData.thumbNailImage) {
      formData.thumbNailImage = formData.thumbNailImage[0].response.data.image;
    }

    updatePubSlide(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {name, faceValue, isEnabled, changePoints} = this.props.data;

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
      <Modal title="更新幻灯片信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {required: true, message: '请输入标题'},
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
          <Col span={24}>
            <FormItem{...formItemLayout} label="面值">
              {getFieldDecorator('faceValue', {
                initialValue: faceValue,
              })(
                <Input type='number'/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="兑换积分">
              {getFieldDecorator('changePoints', {
                initialValue: changePoints,
              })(
                <Input type='number'/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否启用">
              {getFieldDecorator('isEnabled', {
                valuePropName: 'checked',
                initialValue: !!isEnabled,
                rules: []
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
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

export default Form.create()(Update);