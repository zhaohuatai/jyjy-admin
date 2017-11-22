import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Select, Switch, Upload} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {
  loadServiceCourseDataSet,
  loadUploadVideoAuth,
  reloadUploadVideoAuth,
  updateServiceCourseItem
} from '../../../service/course';

import '../../../utils/aliupload/aliyun-sdk.min';
import '../../../utils/aliupload/vod-sdk-upload-1.0.6.min';
import {loadMemberTeacherDataSet} from "../../../service/member";

const FormItem = Form.Item;

class Update extends Component {
  constructor(props) {
    super(props);
    this.uploader = {};
    this.state = {
      fileList: [],
      courseList: [],
      presenterList: [],
      uploading: false,
      videoId: {},
    }
  }

  componentDidMount() {
    loadServiceCourseDataSet({rows: 100}).then(data => {
      this.setState({courseList: data.data.dataSet.rows})
    });

    loadMemberTeacherDataSet({rows: 100}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
    });

    let _this = this;
    this.uploader = new VODUpload({
      // 开始上传
      'onUploadstarted': function (uploadInfo) {
        loadUploadVideoAuth({
          courseItemId: _this.props.data.id,
          videoName: uploadInfo.file.name + '.mp4',
          videoTitle: uploadInfo.file.name + '.mp4',
          videoTags: uploadInfo.file.name + '.mp4',
          videoDesc: uploadInfo.file.name + '.mp4',
        }).then(data => {
          _this.state.videoId = data.data.aliVideoAuthDto.videoId;
          _this.uploader.setUploadAuthAndAddress(uploadInfo, data.data.aliVideoAuthDto.uploadAuth, data.data.aliVideoAuthDto.uploadAddress);
          console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
        });
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
        reloadUploadVideoAuth({
          videoId: _this.videoId,
        }).then(data => {
          _this.uploader.resumeUploadWithAuth(data.data.aliVideoAuth);
        })
      }
    });
    this.uploader.init();
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
      introduction: UE.getEditor('update_courseItemIntroduction').getContent(),
    };

    formData.id = this.props.data.id;
    formData.freePay ? formData.freePay = 0 : formData.freePay = 1;
    formData.isTop ? formData.isTop = 1 : formData.freePay = 0;

    if (formData.coverUrl) {
      formData.coverUrl = formData.coverUrl[0].response.data.image;
    }

    updateServiceCourseItem(formData).then(data => {
      this.props.form.resetFields();
      this.props.oncancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  doUpload = () => {
    this.uploader.startUpload();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      freePay, coverUrl, name, courseId, introduction,
      presenterName, remark, videoAliId, videoDesc, price, priceVIP,
      videoName, videoSize, videoTags, videoTime, itemOrder,
      videoTitle, videoUrl
    } = this.props.data;

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

    const uploadProps = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({fileList}) => {
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

        this.setState(({fileList}) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <Modal title="更新" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="小节名称">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {required: true, message: '请输入小节名称'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('hint', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所属课程">
              {getFieldDecorator('stage', {
                initialValue: courseId,
                rules: [
                  {required: true, message: '请选择所属课程'},
                ]
              })(
                <Select placeholder="选择所属课程" style={{width: '200px'}}>
                  {
                    this.state.courseList.map(item => {
                      return <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主讲人">
              {getFieldDecorator('type', {
                initialValue: presenterName,
                rules: [
                  {required: true, message: '请选择主讲人'},
                ]
              })(
                <Select placeholder="选择主讲人" style={{width: '200px'}}>
                  {
                    this.state.presenterList.map(item => {
                      return <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="免费课程">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
                initialValue: !freePay,
              })(
                <Switch checkedChildren={<Icon type="check"/>}
                        unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="普通价格">
              {getFieldDecorator('phone', {
                initialValue: price,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="会员价格">
              {getFieldDecorator('location', {
                initialValue: priceVIP,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="课程视频">
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload"/> 选择文件
                </Button>
              </Upload>
              <Button type="primary" onClick={this.doUpload} disabled={this.state.fileList.length === 0}
                      loading={this.state.uploading}>
                {this.state.uploading ? '正在上传...' : '开始上传'}
              </Button>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="视频描述">
              {getFieldDecorator('masterNum', {
                initialValue: videoDesc,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="视频名称">
              {getFieldDecorator('academicianNum', {
                initialValue: videoName,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="视频大小">
              {getFieldDecorator('studentNum', {
                initialValue: videoSize,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="视频标签">
              {getFieldDecorator('rank', {
                initialValue: videoTags,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="视频时间">
              {getFieldDecorator('establishTime', {
                initialValue: videoTime,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="视频标题">
              {getFieldDecorator('attached', {
                initialValue: videoTitle,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="视频地址">
              {getFieldDecorator('attached', {
                initialValue: videoUrl,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="课程介绍">
              <UEditor id="update_courseItemIntroduction" height="200" initValue={introduction}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('itemOrder', {
                initialValue: itemOrder,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
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

export default Form.create()(Update);
