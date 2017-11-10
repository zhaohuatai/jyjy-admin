import React from 'react';
import ReactQuill from 'react-quill';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const SysconifgUpdate = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form , formdata} = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="修改系统参数"
        okText="提交"
        width='600px'
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="id">
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入名 配置码' }],
              initialValue:formdata.id
            })(
              <Input readOnly/>
            )}
          </FormItem>

          <FormItem label="名称">
            {getFieldDecorator('confName', {
              rules: [{ required: true, message: '请输入名称' }],
              initialValue:formdata.confName
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="值">
            {getFieldDecorator('confValue', {
              rules: [{ required: true, message: '请输入名 值' }],
              initialValue:formdata.confValue
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="配置码">
            {getFieldDecorator('confCode', {
              rules: [{ required: true, message: '请输入名 配置码' }],
              initialValue:formdata.confCode
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="状态">
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请输入名 状态' }],
              initialValue:formdata.status
            })(
              <Input />
            )}
          </FormItem>
          
        </Form>
      </Modal>
    );
  }
);

export default SysconifgUpdate;