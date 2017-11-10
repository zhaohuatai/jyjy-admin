import React from 'react';
import {addProductAdv} from '../../../http';
import {API_DOMAIN} from '../../../config';
import {
  Form, Select, InputNumber, Switch, Radio, Input,
  Slider, Button, Upload, Icon,Modal
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class NewAd extends React.Component {
  constructor(props){
    super(props);
    this.state={
      fileList: [],
      uploading: false,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.isShow ? values.isShow = 1 : values.isShow = 0;
        addProductAdv(values,data=>{
          this.props.onOk();
          message.success(data.message);
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {onCancel,visible} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Modal
      visible={visible}
      title="新建广告"
      okText="发布"
      width='600px'
      onCancel={onCancel}
      onOk={this.handleSubmit}
    >
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="商品id"
          {...formItemLayout}
        >
          {getFieldDecorator('productId', {
            rules: [{ required: true, message: '请输入商品id!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="排序"
        >
          {getFieldDecorator('showIndex',{
            initialValue:0
          })(
            <InputNumber placeholder='值越大越靠前'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
          hasFeedback
        >
          {getFieldDecorator('status', {
            initialValue:'1',
            rules: [
              { required: true, message: '选择状态' },
            ],
          })(
            <Select placeholder="选择状态">
              <Option value="0">禁用</Option>
              <Option value="1">正常</Option>
              <Option value="2">删除</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="是否显示"
        >
          {getFieldDecorator('isShow', {
              valuePropName: 'checked' ,
              initialValue:true,
            })(
            <Switch />
          )}
        </FormItem>
      </Form>
      </Modal>
    );
  }
}

export default Form.create()(NewAd);
