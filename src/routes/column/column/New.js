import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Row, Select, Switch, Upload} from 'antd';
import {loadMemberTeacherDataSet} from "../../../service/member";
import { createColumnChannel } from '../../../service/column';
import UEditor from "../../../components/editor/UEditor";
import LazyLoad from 'react-lazy-load';
import {API_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;

class New extends Component {

  constructor(props) {
    super(props);
    this.state = {
      presenterList: []
    }
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData = {
      ...formData,
      introduction: UE.getEditor('new_columnIntroduction').getContent(),
      freePay: formData.freePay ? 0 : 1,
      isTop: formData.isTop ? 1 : 0,
    };

    if (formData.coverUrl) {
      formData.coverUrl = formData.coverUrl[0].response.data.image;
    }

    console.log(formData);

    createColumnChannel(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }


  componentDidMount() {
    loadMemberTeacherDataSet({rows: 1000}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
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
            <FormItem{...formItemLayout} label="专栏标题">
              {getFieldDecorator('title', {
                initialValue: '',
                rules: [
                  {required: true, message: '请输入'},
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
            <FormItem {...formItemLayout} label="封面">
              {getFieldDecorator('coverUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: ''
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/channel/columnChannel/uploadCover`}
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
            <FormItem{...formItemLayout} label="主讲人">
              {getFieldDecorator('presenterId', {
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
            <FormItem {...formItemLayout} label="介绍">
              <LazyLoad height={370}>
                <UEditor id="new_columnIntroduction"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="前台显示学习数">
              {getFieldDecorator('learningCount', {
                initialValue: '',
                rules: []
              })(
                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="置顶">
              {getFieldDecorator('isTop', {
                valuePropName: 'checked',
                initialValue: false,
                rules: []
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('showIndex', {
                initialValue: '',
                rules: []
              })(
                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="分享积分">
              {getFieldDecorator('sharePoints', {
                initialValue: '',
                rules: []
              })(
                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: '',
                rules: []
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
