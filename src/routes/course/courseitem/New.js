import React, { Component } from 'react';
import { API_DOMAIN } from '../../../utils/config';
import { Form, Col, Row, Switch, Button, Select, Dropdown, Menu, Upload, Icon, Input} from 'antd';
import { loadUploadVideoAuth, createServiceCourseItem } from '../../../service/course';

const FormItem = Form.Item;
const Option = Select.Option;

class New extends Component {
  constructor(props) {
    super(props);
  }


  handleSubmit = (e) => {
    let formdata = this.props.form.getFieldsValue();

    formdata.freePay ? formdata.firstRate = 1 : formdata.firstRate = 0;
    console.log(formdata);

    createServiceCourseItem(formdata).then(data => {
      //this.props.form.resetFields();
      console.log(data);
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return(
      <div>
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="课程"
            >
              {getFieldDecorator('courseId',{
                initialValue: '',
                rules: [
                  { required: true, message: '请输入课程' },
                ]
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="章节标题"
            >
              {getFieldDecorator('name',{
                initialValue: '',
                rules: [
                  { required: true, message: '请输入标题' },
                ]
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="价格"
            >
              {getFieldDecorator('price',{
                initialValue: '',
                rules: [
                  { required: true, message: '请输入标题' },
                ]
              })(
                <Input type='number'/>
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="会员价"
            >
              {getFieldDecorator('priceVIP',{
                initialValue: '',
                rules: [
                  { required: true, message: '请输入标题' },
                ]
              })(
                <Input type='number'/>
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="是否免费"
            >
              {getFieldDecorator('freePay',{
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Switch />
              )}
            </FormItem>
          </Col >

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="权重"
            >
              {getFieldDecorator('showIndex',{
                initialValue: '',
              })(
                <Input type='number' />
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主讲人姓名"
            >
              {getFieldDecorator('presenterName',{
                initialValue: '',
              })(
                <Input />
              )}
            </FormItem>
          </Col>

        </Row>
        <FormItem
          wrapperCol={{ span: 12, offset: 4 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(New);;
