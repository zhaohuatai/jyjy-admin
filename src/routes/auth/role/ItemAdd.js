import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio, Input,Row,Col,message,
  Slider, Button, Upload, Icon,Modal
} from 'antd';
import {loadAuthAppList,addRole} from '../../../service/auth';

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
      applist:[]
    };
  }

  componentDidMount(){
    loadAuthAppList({},data=>{
      this.setState({
        applist:data.rows
      })
    })
  }

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.enabled ? values.enabled = 1 : values.enabled = 0;
        addRole(values,data=>{
          message.success(data.message);
          this.props.form.resetFields();
          this.props.onAddSuccess();
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
        title="添加"
        width='600px'
				footer={null}
				onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="角色名称"
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
            label="描述"
          >
            {getFieldDecorator('description',{
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色Code"
          >
            {getFieldDecorator('roleCode',{
              rules: [
                { required: true, message: '请输入角色Code' },
              ],
            })(
              <Input />
            )}
          </FormItem>
					
          <FormItem
            {...formItemLayout}
            label="所属应用"
            hasFeedback
          >
            {getFieldDecorator('appKey', {
              rules: [
                { required: true, message: '选择应用' },
              ],
            })(
              <Select placeholder="选择所属应用" >
                {
                  this.state.applist.map(item=>{
                    return <Option key={item.id} value={item.appKey}>{item.name}</Option>
                  })
                }
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否启用"
          >
            {getFieldDecorator('enabled', { 
              initialValue:true,
              valuePropName:'checked'
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

export default Form.create()(Item);