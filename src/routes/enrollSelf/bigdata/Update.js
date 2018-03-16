import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Upload, Icon} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import { updateEnrollAutoBigdata } from "../../../service/bigdata";
import { API_DOMAIN} from '../../../utils/config';

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      content: UE.getEditor('update_bigdata_content').getContent(),
      id: this.props.data.id,
      thumbnailUrl: formData.thumbnailUrl ? formData.thumbnailUrl[0].response.data.image : this.props.data.thumbnailUrl,
    }

    updateEnrollAutoBigdata(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    })
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  constructor(props) {
    super(props);
    this.state = {
      category: []
    }
  }

  componentDidMount() {
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {content, title, remark, browseCount, favoriteCount} = this.props.data;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
    };

    return (
      <Modal title="更新" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="标题">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [
                  {required: true, message: '请输入标题'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="缩略图">
              {getFieldDecorator('thumbnailUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="file" action={`${API_DOMAIN}admin/enroll/enrollAutoBigdata/uploadThumbnailUrl`} listType="picture"
                        withCredentials={true}>
                  <Button>
                    <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="内容">
              <UEditor id="update_bigdata_content" initValue={content}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="浏览数">
              {getFieldDecorator('browseCount', {
                initialValue: browseCount
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: remark,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);
