import React, { Component } from 'react';
import { API_DOMAIN } from '../../../utils/config';
import { Form, Col, Row, Switch, Button, Select, Dropdown, Menu, Upload, Icon, Input, Modal, message} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import { updateServiceCourseItem, loadUploadVideoAuth } from '../../../service/course';
import { loadProvinceList } from '../../../service/dic';
import {IMG_DOMAIN} from "../../../config";
import '../../../utils/aliupload/aliyun-sdk';
import '../../../utils/aliupload/vod-sdk-upload';

const FormItem = Form.Item;
const Option = Select.Option;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,

    }
  }

  componentDidMount() {
    let _this = this;
    var uploader = new VODUpload({
      // 开始上传
      'onUploadstarted': function (uploadInfo) {
        console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + JSON.stringify(uploadInfo.object));
        console.log(uploader);
        this.uploader.setUploadAuthAndAddress(uploadInfo, 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU3pBUjFxNkZ0NUIyeWZTaklyYWZBZWMzeW1hVkt3byt1VkZUM29Gb2ZlczVCZ3ZQSjJ6ejJJSHBLZVhkdUFlQVhzL28wbW1oWjcvWVlsclVxRzhFZUhoV2NOWkVwdGNzSHExNzdKcGZadjh1ODRZQURpNUNqUVk4VHBNdHVuNTI4V2Y3d2FmK0FVQm5HQ1RtZDVNY1lvOWJUY1RHbFFDWnVXLy90b0pWN2I5TVJjeENsWkQ1ZGZybC9MUmRqcjhsbzF4R3pVUEcyS1V6U24zYjNCa2hsc1JZZTcyUms4dmFIeGRhQXpSRGNnVmJtcUpjU3ZKK2pDNEM4WXM5Z0c1MTlYdHlwdm9weGJiR1Q4Q05aNXo5QTlxcDlrTTQ5L2l6YzdQNlFIMzViNFJpTkw4L1o3dFFOWHdoaWZmb2JIYTlZcmZIZ21OaGx2dkRTajQzdDF5dFZPZVpjWDBha1E1dTdrdTdaSFArb0x0OGphWXZqUDNQRTNyTHBNWUx1NFQ0OFpYVVNPRHREWWNaRFVIaHJFazRSVWpYZEk2T2Y4VXJXU1FDN1dzcjIxN290ZzdGeXlrM3M4TWFIQWtXTFg3U0IyRHdFQjRjNGFFb2tWVzRSeG5lelc2VUJhUkJwYmxkN0JxNmNWNWxPZEJSWm9LK0t6UXJKVFg5RXoycExtdUQ2ZS9MT3M3b0RWSjM3V1p0S3l1aDRZNDlkNFU4clZFalBRcWl5a1QwdEZncGZUSzFSemJQbU5MS205YmFCMjUvelcrUGREZTBkc1Znb0xGS0twaUdXRzNSTE5uK3p0Sjl4YUZ6ZG9aeUlrL1dWcTh3NVQxRjJ2SUFCWEZyQUs0aHV0azQ4OGFDOTZGT044ZVB1VlRmbzNCSmhxb2FEb2RZZnRCTTZKNjM0MjdMTmhGT0U0aXpNTzV0ZXNkek1SV2hpVFM2d2YzRkUyLzJJamhvRjNVdGJ6VHpxWlU1UHVnblBqampvTFpSTGlPYjM3M2RGRTdwVnArUFVjRDZwNVY1OEV1aU81N3NicUUyVnVoU2xrSjBhZ0FHWVN3VWt6VXBsclo5YTJ0U1hYTUJ3SWMzOTFjSzRocU9qaVF0ZGhERFpKcGtzYlFWbEFNdHdQbGFOY2QrQ0d4VjN1emFXRnBXWWNOaGZPUCsrYjdwMk1CMnU1UU42MG1lVU44M0VmT05qM21vYU1pc1VJQUdlK2lTcmwvRjExWm1sT1dJVGNZdkc0RFFGSFBCOGN0TmczajNZaTUrT2JMSUVKdU1ScVlvVk5BPT0iLCJBY2Nlc3NLZXlJZCI6IlNUUy5MZHUyd0Z0emt1TUVWckZEWkp2QW1tNmI5IiwiQWNjZXNzS2V5U2VjcmV0IjoiQ0N2WGlNa3FCSzNoSEtvRHpzdEx6VkN4TVhXZHVIQ1JVYzlXRU5tQUp6NmUiLCJFeHBpcmF0aW9uIjoiMjcyMiJ9', 'eyJFbmRwb2ludCI6Imh0dHBzOi8vb3NzLWNuLXNoYW5naGFpLmFsaXl1bmNzLmNvbSIsIkJ1Y2tldCI6ImluLTIwMTcxMTA3MTcyMDI4NjkzLTI2a3F6MnpjZ28iLCJGaWxlTmFtZSI6InZpZGVvLzE5MThGMDg3LTE1RkQ3ODdERkQ1LTAwMDYtOUVBQi1BQkUtRTQwQ0MubXA0In0=');
        //_this.setAuth();
      },
      // 文件上传成功
      'onUploadSucceed': function (uploadInfo) {
        console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + JSON.stringify(uploadInfo.object));
      },
      // 文件上传失败
      'onUploadFailed': function (uploadInfo, code, message) {
        console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + JSON.stringify(message));
      },
      // 文件上传进度，单位：字节
      'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
        console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");
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
    let formdata = this.props.form.getFieldsValue();
    formdata = { ...formdata,
      introduction: UE.getEditor('update_introduction').getContent(),
    };

    formdata.freePay ? formdata.freePay = 1 : formdata.freePay = 0;
    formdata.id = this.props.data.id;

    console.log(formdata);

    if(formdata.coverUrl){
      formdata.coverUrl = formdata.coverUrl[0].response.data.image;
    }

    updateServiceCourseItem(formdata).then(data => {
      console.log(data);
    })
  }


  handleChangeVideo = (e) => {

  }

  setAuth = () => {
    let file = this.state.fileList[0];


    loadUploadVideoAuth({
      courseItemId: 1,
      vedioName: file.name,
      vedioTitle: file.name,
      vedioTags: file.name,
      vedioDesc: file.name,
    }).then(data => {

      this.uploader.setUploadAuthAndAddress(data.data.aliVideoAuthDto.uploadAuth, data.data.aliVideoAuthDto.uploadAddress);
      console.log(this.uploader);

    }).catch(err => {
      message.warn(err);
    });
  }

  doUpload = () => {

    // let file = this.state.fileList[0];
    //
    // loadUploadVideoAuth({
    //   courseItemId: 1,
    //   vedioName: file.name,
    //   vedioTitle: file.name,
    //   vedioTags: file.name,
    //   vedioDesc: file.name,
    // }).then(data => {
    //   this.uploader.setUploadAuthAndAddress(data.data.aliVideoAuthDto.uploadAuth, data.data.aliVideoAuthDto.uploadAddress);
    //   this.uploader.startUpload()
    //
    // }).catch(err => {
    //   message.warn(err);
    // });

    this.uploader.startUpload()

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      freePay, coverUrl, name, courseId, introduction,
      presenterName, remark, videoAliId, videoDesc, price, priceVIP,
      videoName, videoSize, videoTags, videoTime,
      videoTitle, videoUrl
    } = this.props.data;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    let provinceMenu = (
      this.state
    )

    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        let userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';

        this.uploader.addFile(file, null, null, null, userData);

        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return(
      <Modal
        title="更新"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width={'80%'}
      >
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="节次名称"
            >
              {getFieldDecorator('name',{
                initialValue: name,
                rules: [
                  { required: true, message: '请输入节次名称' },
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="校徽图片"
            >
              <img src={`${IMG_DOMAIN}${coverUrl}`} style={{width: '100px', height: '100px'}} />
              {getFieldDecorator('coverUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/course/serviceCourseItem/uploadCover`}
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
              label="是否免费"
            >
              {getFieldDecorator('firstRate',{
                valuePropName: 'checked',
                initialValue: freePay ? true : false,
              })(
                <Switch />
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="课程id"
            >
              {getFieldDecorator('stage',{
                initialValue: courseId,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主讲人"
            >
              {getFieldDecorator('type',{
                initialValue: presenterName,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="普通价格"
            >
              {getFieldDecorator('phone',{
                initialValue: price,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="会员价格"
            >
              {getFieldDecorator('location',{
                initialValue: priceVIP,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="课程视频"
            >
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 选择文件
                </Button>
              </Upload>
              <Button onClick={this.setAuth}>
                设置auth
              </Button>
              <Button
                className="upload-demo-start"
                type="primary"
                onClick={this.doUpload}
                disabled={this.state.fileList.length === 0}
                loading={this.state.uploading}
              >
                {this.state.uploading ? 'Uploading' : 'Start Upload' }
              </Button>

            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="阿里视频id"
            >
              {getFieldDecorator('doctor',{
                initialValue: videoAliId,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频描述"
            >
              {getFieldDecorator('masterNum',{
                initialValue: videoDesc,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频名称"
            >
              {getFieldDecorator('academicianNum',{
                initialValue: videoName,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频大小"
            >
              {getFieldDecorator('studentNum',{
                initialValue: videoSize,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频标签"
            >
              {getFieldDecorator('rank',{
                initialValue: videoTags,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频时间"
            >
              {getFieldDecorator('establishTime',{
                initialValue: videoTime,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频标题"
            >
              {getFieldDecorator('attached',{
                initialValue: videoTitle,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频地址"
            >
              {getFieldDecorator('attached',{
                initialValue: videoUrl,
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              <UEditor id="update_specialProfession" height="200" initValue={introduction} />
            </FormItem>
          </Col>
        </Row>
        <FormItem
          wrapperCol={{ span: 12, offset: 4 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);;
