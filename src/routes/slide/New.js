import React, {Component} from 'react';
import {API_DOMAIN} from '../../utils/config';
import {Button, Col, Form, Icon, Input, message, Row, Select, Upload} from 'antd';
import UEditor from '../../components/editor/UEditor';
import {createPubSlide} from '../../service/slide';

const FormItem = Form.Item;
const Option = Select.Option;

class New extends Component {
  constructor(props) {
    super(props);
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      content: UE.getEditor('slide_content').getContent(),
    };

    formData.imgUrl = formData.imgUrl[0].response.data.image;

    createPubSlide(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
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
              label="标题"
            >
              {getFieldDecorator('title',{
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
              label="备注"
            >
              {getFieldDecorator('remark',{
                initialValue: '',
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="权重"
            >
              {getFieldDecorator('showWeight',{
                initialValue: '',
              })(
                <Input type='number' />
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="校徽图片"
            >
              {getFieldDecorator('imgUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/pub/pubSlide/uploadImage`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col >

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学历要求"
            >
              <LazyLoad once>
                <UEditor id="slide_content" height="200"/>
              </LazyLoad>
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
