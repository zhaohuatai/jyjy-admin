import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, InputNumber, Modal, Radio, Row, Select, Switch} from 'antd';

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
			editable:true,
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
    const {onCancel,visible,data} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
		
    return (
      <Modal
        visible={visible}
        title="详情"
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
              initialValue:data.name,
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="排序"
          >
            {getFieldDecorator('showIndex',{
              initialValue:data.showIndex
            })(
              <InputNumber readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('description',{
              initialValue:data.description
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="权限名称"
          >
            {getFieldDecorator('permName',{
              initialValue:data.permName
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
					<FormItem
            {...formItemLayout}
            label="模块名称"
          >
            {getFieldDecorator('moduleName',{
              initialValue:data.moduleName
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="类型"
          >
            {getFieldDecorator('type',{
              initialValue:data.type
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="模块"
            hasFeedback
          >
            {getFieldDecorator('moduleId', {
              initialValue:'1',
              rules: [
                { required: true, message: '选择状态' },
              ],
            })(
              <Select placeholder="选择状态" readOnly={this.state.editable}>
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

					{
						this.state.editable ?  null : 
						<FormItem
							wrapperCol={{
							xs: { span: 16, offset: 0 },
							sm: { span: 16, offset: 4 },
						}}
						>
							<Button
								type="primary"
								htmlType="submit"
								disabled={hasErrors(getFieldsError())}
							>
								提交更改
							</Button>
						</FormItem>
					}
					<Row gutter={16}  >
					<Col className="gutter-row" span={3} >
            <Switch onChange={()=>this.setState({editable:!this.state.editable})} checkedChildren="编辑" unCheckedChildren="只读"/>
          </Col>
					</Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Item);