import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Upload} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {updateMemberTeacher} from '../../../service/member';
import LazyLoad from 'react-lazy-load';
import {API_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      detail: UE.getEditor('teacher_introduction').getContent(),
      id: this.props.data.id,
    }

    updateMemberTeacher(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      provinceList: []
    }
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {rank, name, introduction} = this.props.data;

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
      <Modal title="更新教师信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="教师姓名">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {required: true, message: '教师姓名'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="头像">
              {getFieldDecorator('profilePicture', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/member/memberTeacher/uploadProfilePicture`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="排名">
              {getFieldDecorator('rank', {
                initialValue: rank,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="教师简介">
              <LazyLoad height={370}>
                <UEditor id="teacher_introduction" initValue={introduction}/>
              </LazyLoad>
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
