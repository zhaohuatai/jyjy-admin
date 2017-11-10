import React from 'react';
import {updatePubTerm} from '../../../http';
import {
  Form, Select, InputNumber, Switch, Radio, Input, message,
  Slider, Button, Upload, Icon,Modal
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class NewPost extends React.Component {
  constructor(props){
    super(props);
    this.state={
      id:null,
      content:null,
      title:null
    }
  }

  handleSubmit = () => {
    const { thumbfileList,id } = this.state;
    const {onOk,form} = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.content = this.state.content;
        values.status = '1';
        updatePubTerm(values,data=>{
          message.success(data.message);
          onOk();
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {onCancel,visible,data} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Modal
      visible={visible}
      title="编辑协议"
      okText="发布"
      width='600px'
      onCancel={onCancel}
      onOk={this.handleSubmit}
    >
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="标题"
          {...formItemLayout}
        >
        {getFieldDecorator('title', {
          initialValue:data.title,
        })(
          <Input />
        )}
        </FormItem>
        <FormItem
          label="id"
          {...formItemLayout}
        >
        {getFieldDecorator('id', {
          initialValue:data.id,
        })(
          <Input readOnly/>
        )}
        </FormItem>
        <FormItem
          label="内容"
          {...formItemLayout}
        >
          <ReactQuill defaultValue={data.content} value={this.state.content} onChange={value=>this.setState({ content: value })}/>
        </FormItem>
      </Form>
      </Modal>
    );
  }
}

export default Form.create()(NewPost);
