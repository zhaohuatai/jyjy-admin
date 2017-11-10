import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio, Input,Row,Col,
  Slider, Button, Upload, Icon,Modal
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UserAddRole extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  componentDidMount(){
      console.log(this.props.userid);
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
    const {onCancel,visible,userid} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
		
    return (
      <Modal
        visible={visible}
        title="用户角色管理"
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
            label="状态"
          >
            {getFieldDecorator('isShow', { 
              valuePropName: 'checked' ,
              initialValue:true,
            })(
              <Switch />
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

export default Form.create()(UserAddRole);