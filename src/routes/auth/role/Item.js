import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio, Input,Row,Col,message,
  Slider, Button, Upload, Icon,Modal, Tag
} from 'antd';
import {updateRole,loadAuthAppList,removePermsFromRole} from '../../../http';

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
        values.id = this.props.data.id;
        values.enabled ? values.enabled = 1 : values.enabled = 0;
        updateRole(values,data=>{
          message.success(data.message);
          this.props.doUpdateSuccess()
        })
      }
    });
  }

  handleDeletePerm = (tag,roleId) =>{
    removePermsFromRole({'permIds[]':tag,roleId:roleId},data=>{
      if(data.statusCode==200){
        message.success(data.message);
      }
    })
  }

  render() {
    const { getFieldDecorator,getFieldsError } = this.props.form;
    const {onCancel,visible,data} = this.props;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };

    return (
      <Modal
        visible={visible}
        title="详情"
        width='1000px'
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
            label="角色Code"
          >
            {getFieldDecorator('roleCode',{
              initialValue:data.roleCode
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所属应用"
            hasFeedback
          >
            {getFieldDecorator('appKey', {
              initialValue:data.appKey,
              rules: [
                { required: true, message: '选择状态' },
              ],
            })(
              <Select placeholder="选择状态" readOnly={this.state.editable}>
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
              initialValue: data.enabled,
              valuePropName:'checked'
            })(
              <Switch />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label=" 权限列表"
          >
            {
              data.perms ?
              data.perms.map(item=>{
                return <Tag key={item.id} closable={!this.state.editable} afterClose={() => this.handleDeletePerm(item.id,data.id)} >{item.name}</Tag>
              })
              :
              null
            }
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
