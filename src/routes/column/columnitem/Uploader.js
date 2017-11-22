import React, {Component} from 'react';
import {API_DOMAIN} from '../../../utils/config';
import {Col, Form, Icon, Input, message, Row, Select, Upload} from 'antd';
import {createServiceCourseItem, loadUploadVideoAuth} from '../../../service/course';
import '../../../utils/aliupload/aliyun-sdk';
import '../../../utils/aliupload/vod-sdk-upload';

const FormItem = Form.Item;
const Option = Select.Option;

class New extends Component {
  constructor(props) {
    super(props);
    this.uploader = {};
  }

  componentDidMount() {
    this.uploader = new VODUpload({
      // 开始上传
      'onUploadstarted': function (uploadInfo) {
        log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
        // uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress);
      },
      // 文件上传成功
      'onUploadSucceed': function (uploadInfo) {
        log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
      },
      // 文件上传失败
      'onUploadFailed': function (uploadInfo, code, message) {
        log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
      },
      // 文件上传进度，单位：字节
      'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
        log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");
      },
      // 上传凭证超时
      'onUploadTokenExpired': function () {
        console.log("onUploadTokenExpired");
        // uploader.resumeUploadWithAuth(uploadAuth);
      }
    });
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

    createServiceCourseItem(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  handleChangeVideo = (e) => {
    //let event = document.getElementById("videofiles").target;
    let userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
    let file = e.target.files[0];
    console.log(e.target.files[0]);

    loadUploadVideoAuth({
      courseItemId: 1,
      vedioName: file.name,
      vedioTitle: file.name,
      vedioTags: file.name,
      vedioDesc: file.name,
    }).then(data => {
      this.uploader.addFile(e.target.files[0], null, null, null, userData);
    });
  }

  doUpload = () => {
    this.uploader.startUpload()
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
              label="课程视频"
            >
              <input onChange={this.handleChangeVideo} type="file" name="file" id="videofiles" multiple/>
              <button onClick={this.doUpload}>开始上传</button>
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
