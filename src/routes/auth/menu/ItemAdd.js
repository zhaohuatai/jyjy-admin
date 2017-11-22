import React, {Component} from 'react';
import {Button, Form, Icon, Input, InputNumber, Modal, Radio, Select, Switch} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Item extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
	
  render() {
    const { getFieldDecorator,getFieldsError } = this.props.form;
    const {onCancel,visible} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
		
    return (
      <Modal
        visible={visible}
        title="添加"
        width='600px'
				footer={null}
				onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="名称"
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '名称!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="排序"
          >
            {getFieldDecorator('showIndex',{
            })(
              <InputNumber />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('description',{
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="权限名称"
          >
            {getFieldDecorator('permName',{
            })(
              <Input />
            )}
          </FormItem>
					<FormItem
            {...formItemLayout}
            label="模块名称"
          >
            {getFieldDecorator('moduleName',{
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="类型"
          >
            {getFieldDecorator('type',{
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="模块"
            hasFeedback
          >
            {getFieldDecorator('moduleId', {
              rules: [
                { required: true, message: '选择状态' },
              ],
            })(
              <Select placeholder="选择状态" >
                <Option value="0">禁用</Option>
                <Option value="1">正常</Option>
                <Option value="2">删除</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="状态"
          >
            {getFieldDecorator('isShow', { 
              valuePropName: 'enabled' ,
              initialValue:true,
            })(
              <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
            )}
          </FormItem>

          <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 4 },
          }}
        >
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Item);