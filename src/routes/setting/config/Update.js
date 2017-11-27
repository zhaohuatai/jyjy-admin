import React, {Component} from 'react';
import {Form, Input, message, Modal} from 'antd';
import {updateDicSysconfig} from "../../../service/system";

const FormItem = Form.Item;

class Update extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      update_courseContent: UE.getEditor('update_courseIntroduction').getContent(),
      freePay: formData.freePay ? 0 : 1,
      isTop: formData.isTop ? 1 : 0,
      id: this.props.data.id
    };

    updateDicSysconfig(formData).then(data => {
      this.props.form.resetFields();
      this.props.oncancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {

    const {visible, onCancel, onCreate, formData} = this.props;

    const {getFieldDecorator} = this.props.form;

    return (
      <Modal visible={visible} title="修改系统参数" okText="提交" width='600px' onCancel={onCancel} onOk={onCreate}>
        <Form layout="vertical">
          <FormItem label="序号">
            {getFieldDecorator('confCode', {
              initialValue: formData.id
            })(
              <Input readOnly/>
            )}
          </FormItem>

          <FormItem label="配置码">
            {getFieldDecorator('confCode', {
              initialValue: formData.id
            })(
              <Input readOnly/>
            )}
          </FormItem>

          <FormItem label="配置名称">
            {getFieldDecorator('confName', {
              rules: [{required: true, message: '请输入名称'}],
              initialValue: formData.confName
            })(
              <Input/>
            )}
          </FormItem>

          <FormItem label="值">
            {getFieldDecorator('confValue', {
              rules: [{required: true, message: '请输入名 值'}],
              initialValue: formData.confValue
            })(
              <Input/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Update);