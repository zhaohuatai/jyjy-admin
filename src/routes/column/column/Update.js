import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Select, Switch, Upload} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {loadMemberTeacherDataSet} from "../../../service/member";
import LazyLoad from 'react-lazy-load';
import {updateColumnChannel} from "../../../service/column";
import {API_DOMAIN} from "../../../utils/config";


const FormItem = Form.Item;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presenterList :[]
    }
  }

  componentDidMount() {
    loadMemberTeacherDataSet({rows: 1000}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      update_courseContent: UE.getEditor('update_courseIntroduction').getContent(),
      freePay: formData.freePay ? 0 : 1,
      isTop: formData.isTop ? 1 : 0,
      id: this.props.data.id
    };

    updateColumnChannel(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, introduction, hint, presenterId, sharePoints, freePay, price, priceVIP, learningCount, isTop, showIndex, remark} = this.props.data;

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
            <FormItem{...formItemLayout} label="专栏标题">
              {getFieldDecorator('title', {
                initialValue: title,
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
                initialValue: hint,
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
            <FormItem {...formItemLayout} label="介绍">
              <LazyLoad height={370}>
                <UEditor id="update_columnIntroduction" initValue={introduction}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="免费课程">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
                initialValue: !freePay,
                rules: []
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="价格">
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
            <FormItem {...formItemLayout} label="前台显示学习数">
              {getFieldDecorator('learningCount', {
                initialValue: learningCount,
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
                initialValue: !!isTop,
                rules: []
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('showIndex', {
                initialValue: showIndex,
                rules: []
              })(
                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="分享积分">
              {getFieldDecorator('sharePoints', {
                initialValue: sharePoints,
                rules: []
              })(
                <Input type="number"/>
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

export default Form.create()(New);
