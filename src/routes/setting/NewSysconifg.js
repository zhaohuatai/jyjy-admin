import React from 'react';
import ReactQuill from 'react-quill';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const SysconfigFilter = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="新建分类"
        okText="发布"
        width='600px'
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题' }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default SysconfigFilter;