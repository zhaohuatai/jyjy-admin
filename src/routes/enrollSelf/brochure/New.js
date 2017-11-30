import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row} from 'antd';
import UEditor from "../../../components/editor/UEditor";
import LazyLoad from 'react-lazy-load';
import {createEnrollAutoRecruitBrochure} from "../../../service/autoSelf";


const FormItem = Form.Item;

class New extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData = {
      ...formData,
      content: UE.getEditor('new_brochureContent').getContent(),
    };

    if (formData.imgUrl) {
      formData.thumbNailImage = formData.thumbNailImage[0].response.data.image;
    }

    createEnrollAutoRecruitBrochure(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };

    return (
      <div>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {required: true, message: '请输入标题'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="new_brochureContent"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: '',
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(New);
