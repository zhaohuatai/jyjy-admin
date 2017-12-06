import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Row, Select, Switch, InputNumber} from 'antd';
import {createServiceCourseItem, loadServiceCourseDataSet} from '../../../service/course';
import {loadMemberTeacherDataSet} from "../../../service/member";
import LazyLoad from 'react-lazy-load';
import UEditor from "../../../components/editor/UEditor";

const FormItem = Form.Item;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelList: [],
      presenterList :[]
    }
  }

  componentDidMount() {
    loadServiceCourseDataSet({rows: 10000, status: 1}).then(data => {
      this.setState({channelList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })

    loadMemberTeacherDataSet({rows: 10000, status: 1}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      introduction: UE.getEditor('new_courseItemIntroduction').getContent(),
      freePay: formData.freePay ? 0 : 1,
    };

    createServiceCourseItem(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  };

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
            <FormItem{...formItemLayout} label="小节名称">
              {getFieldDecorator('name', {
                initialValue: '',
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
              {getFieldDecorator('courseId', {
                rules: [
                  {required: true, message: '请选择所属课程'},
                ]
              })(
                <Select placeholder="选择所属课程" style={{width: '200px'}}>
                  {
                    this.state.channelList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主讲人">
              {getFieldDecorator('presenterId', {
                initialValue: '',
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
            <FormItem{...formItemLayout} label="是否免费">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
              })(
                <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="普通价格/元">
              {getFieldDecorator('price', {
                initialValue: 0,
                rules: []
              })(
                <InputNumber/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="会员价格/元">
              {getFieldDecorator('priceVIP', {
                initialValue: 0,
                rules: []
              })(
                <InputNumber />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="课程介绍">
              <LazyLoad height={370}>
                <UEditor id="new_courseItemIntroduction"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('itemOrder', {
                initialValue: '',
                rules: []
              })(
                <Input/>
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
        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(New);;
