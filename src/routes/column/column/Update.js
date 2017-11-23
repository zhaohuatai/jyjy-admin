import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Select, Switch} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {updatePubCustomize} from "../../../service/customize";
import {loadMemberTeacherDataSet} from "../../../service/member";

const FormItem = Form.Item;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      presenterList :[]
    }
  }

  componentDidMount() {
    loadMemberTeacherDataSet({rows: 100}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
    })
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      update_courseContent: UE.getEditor('update_courseIntroduction').getContent(),
    };

    formData.id = this.props.data.id;
    formData.freePay ? formData.freePay = 0 : formData.freePay = 1;
    formData.isTop ? formData.isTop = 1 : formData.freePay = 0;

    updatePubCustomize(formData).then(data => {
      this.props.form.resetFields();
      this.props.oncancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {name, categoryId, introduction, hint, presenterId, freePay, price, priceVIP, learningCount, isTop, showIndex, remark} = this.props.data;

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
          <FormItem{...formItemLayout} label="课程名">
            <Col span={24}>
              <FormItem{...formItemLayout} label="课程名">
                {getFieldDecorator('name', {
                  initialValue: name,
                  rules: [
                    {required: true, message: '请输入名称'},
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
              <FormItem {...formItemLayout} label="介绍">
                <LazyLoad once>
                  <UEditor id="update_courseIntroduction" height="200" initialValue={introduction}/>
                </LazyLoad>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem{...formItemLayout} label="主讲人">
                {getFieldDecorator('type', {
                  initialValue: presenterId,
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
                  <Input/>
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
          </FormItem>
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);
