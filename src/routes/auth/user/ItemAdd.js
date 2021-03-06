import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Radio, Select} from 'antd';
import md5 from 'blueimp-md5';
import {createAccount, loadAuthRoleList} from '../../../service/auth';

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
      roles:[]
    };
  }

  componentDidMount() {
    loadAuthRoleList({},data=>{
      this.setState({roles:data.rows});
    })
  }

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let salt = 'zhtframework_94DABGioQOq2tTUO0AXYow';
        values.password = md5(salt+values.password);
        console.log('Received values of form: ', values);
        createAccount(values,data=>{
          message.success(data.message);
          this.props.form.resetFields();
          this.props.onOk();
        })
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
        title="添加用户"
        width='600px'
				footer={null}
				onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="账号"
            {...formItemLayout}
          >
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '名称!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
          >
            {getFieldDecorator('password',{
              rules: [
                { required: true, message: '输入密码' },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色"
            hasFeedback
          >
            {getFieldDecorator('roleCode', {
              rules: [
                { required: true, message: '选择角色' },
              ],
            })(
              <Select placeholder="选择角色" >
                {
                this.state.roles.map(item=>{
                  return <Select.Option key={item.id} value={`${item.roleCode}`}>{item.name}</Select.Option>
                })
              }
              </Select>
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
