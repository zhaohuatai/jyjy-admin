import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Select, Switch, Upload} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {loadServiceCourseDataSet, loadUploadVideoAuth, updateServiceCourseItem} from '../../../service/course';
import LazyLoad from 'react-lazy-load';
import {loadMemberTeacherDataSet} from "../../../service/member";

// import '../../../utils/aliupload/aliyun-sdk.min';
// import '../../../utils/aliupload/vod-sdk-upload-1.1.0.min';

const FormItem = Form.Item;

// 创建 上传实例 变量
var uploader;

class Update extends Component {
  constructor(props) {
    super(props);
    //this.uploader = {};
    this.state = {
      fileList: [],
      courseList: [],
      presenterList: [],
      uploading: false,
      videoId: {},
      aliVideoAuthDto: {
        requestId: '',
        uploadAddress: '',
        uploadAuth: '',
        videoId: ''
      },
      upload_progress: ''
    }
  }

  componentDidMount() {
    loadServiceCourseDataSet({rows: 10000}).then(data => {
      this.setState({courseList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })

    loadMemberTeacherDataSet({rows: 10000}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })

    let _this = this;

    uploader = new VODUpload({
      // 文件上传失败
      'onUploadFailed': function (uploadInfo, code, message) {
        message.fail('上传失败，请稍后再试');
        //console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
      },
      // 文件上传完成
      'onUploadSucceed': function (uploadInfo) {
        _this.setState({ uploading: false})
        message.success('上传成功');
        //console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
      },
      // 文件上传进度
      'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
        //console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");
        _this.setState({ upload_progress: Math.ceil(uploadedSize * 100 / totalSize) + "%"})
      },
      // STS临时账号会过期，过期时触发函数
      'onUploadTokenExpired': function () {
        message.success('上传凭证过期，请重试');
        //console.log("onUploadTokenExpired");
      },
      // 开始上传
      'onUploadstarted': function (uploadInfo) {
        _this.setState({ uploading: true });
        uploader.setUploadAuthAndAddress(uploadInfo, _this.state.aliVideoAuthDto.uploadAuth, _this.state.aliVideoAuthDto.uploadAddress);
      }
    });
    uploader.init();
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
      id: this.props.data.id,
      freePay: formData.freePay ? 0 : 1,
      isTop: formData.isTop ? 1 : 0,
    };

    if (Object.prototype.toString.call(formData.coverUrl) === '[object Array]') {
      formData.coverUrl = formData.coverUrl[0].response.data.image;
    }

    updateServiceCourseItem(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  doUpload = () => {
    console.log('start');
    uploader.startUpload();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      freePay, name, hint, courseId, introduction, tryVideoUrl,
      presenterId, remark, videoAliId, videoDesc, price, priceVIP,
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

        console.log(file);

        uploader.addFile(file, null, null, null, userData);

        // 获取上传凭证
        loadUploadVideoAuth({
          courseItemId: this.props.data.id,
          videoName: file.name,
          videoTitle: file.name,
          videoTags: file.name,
          videoDesc: file.name,
        }).then(data => {
          console.log(data);
          //_this.state.videoId = data.data.aliVideoAuthDto.videoId;
          //uploader.setUploadAuthAndAddress(uploadInfo, data.data.aliVideoAuthDto.uploadAuth, data.data.aliVideoAuthDto.uploadAddress);
          //console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
          this.setState({aliVideoAuthDto: data.data.aliVideoAuthDto});
        });

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
            <FormItem {...formItemLayout} label="小节名称">
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
                initialValue: hint,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="所属课程">
              {getFieldDecorator('courseId', {
                initialValue: courseId + '',
                rules: [
                  {required: true, message: '请选择所属课程'},
                ]
              })(
                <Select placeholder="选择所属课程" style={{width: '200px'}}>
                  {
                    this.state.courseList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="主讲人">
              {getFieldDecorator('type', {
                initialValue: presenterId + '',
                rules: [
                  {required: true, message: '请选择主讲人'},
                ]
              })(
                <Select placeholder="选择主讲人" style={{width: '200px'}}>
                  {
                    this.state.presenterList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="免费课程">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
                initialValue: !freePay,
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="普通价格">
              {getFieldDecorator('price', {
                initialValue: price,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="会员价格">
              {getFieldDecorator('priceVIP', {
                initialValue: priceVIP,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="课程视频">
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload"/> 选择文件
                </Button>
              </Upload>
              <Button type="primary" onClick={this.doUpload} disabled={this.state.fileList.length === 0}
                      loading={this.state.uploading}>
                {this.state.uploading ? this.state.upload_progress : '开始上传'}
              </Button>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频描述">
              {getFieldDecorator('videoDesc', {
                initialValue: videoDesc,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频名称">
              {getFieldDecorator('videoName', {
                initialValue: videoName,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频大小">
              {getFieldDecorator('studentNum', {
                initialValue: videoSize,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频标签">
              {getFieldDecorator('videoTags', {
                initialValue: videoTags,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频时间">
              {getFieldDecorator('videoTime', {
                initialValue: videoTime,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频标题">
              {getFieldDecorator('videoTitle', {
                initialValue: videoTitle,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频地址">
              {getFieldDecorator('tryVideoUrl', {
                initialValue: tryVideoUrl,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="课程介绍">
              <LazyLoad height={370}>
                <UEditor id="update_courseItemIntroduction" initValue={introduction}/>
              </LazyLoad>
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
