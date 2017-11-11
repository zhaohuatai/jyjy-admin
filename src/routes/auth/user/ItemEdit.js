import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio, Input,Row,Col,message,
  Slider, Button, Upload, Icon,Modal
} from 'antd';
import md5 from 'blueimp-md5';
import {changePwd,loadAuthRoleList} from '../../../service/auth';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ItemEdit extends Component {
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
        values.newPassword = md5(salt+values.newPassword);
        values.oldPassword = md5(salt+values.oldPassword);

        console.log('Received values of form: ', values);
        changePwd(values,data=>{
          message.success(data.message);
          this.props.form.resetFields();
          this.props.onOk();
        })
      }
    });
  }

  render() {
    const { getFieldDecorator,getFieldsError } = this.props.form;
    const {onCancel,visible,data} = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Modal
        visible={visible}
        title="用户信息编辑"
        width='600px'
				footer={null}
				onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            label="id"
            {...formItemLayout}
          >
            {getFieldDecorator('userId', {
              rules: [{ required: true, message: '用户id!' }],
              initialValue:data.id
            })(
              <Input readOnly/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="旧密码"
          >
            {getFieldDecorator('oldPassword',{
              rules: [
                { required: true, message: '输入密码' },
              ],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPassword',{
              rules: [
                { required: true, message: '输入密码' },
              ],
            })(
              <Input />
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

export default Form.create()(ItemEdit);
