import React, {Component} from 'react';
import {Form, Col, Row, Switch, Button, Select, Dropdown, Menu, Upload, Icon, Input} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {loadServiceCourseCategoryDataSet} from "../../../service/courseCategory";
import {createServiceCourse} from "../../../service/course";

const FormItem = Form.Item;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: []
    }
  }

  componentDidMount() {
    loadServiceCourseCategoryDataSet({rows: 100}).then(data => {
      this.setState({categoryList: data.data.dataSet.rows})
    })
  }

  handleSubmit = (e) => {
    let form_data = this.props.form.getFieldsValue();
    form_data = {
      ...form_data,

    };

    console.log(form_data);

    createServiceCourse(form_data).then(data => {
      console.log(data);
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
            <FormItem
              {...formItemLayout}
              label="课程名"
            >
              {getFieldDecorator('name', {
                initialValue: '',
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
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="选择分类">
              {getFieldDecorator('categoryId', {
                initialValue: '',
                rules: [
                  {required: true, message: '请选择分类'},
                ]
              })(
                <Select
                  placeholder="选择分类"
                  style={{width: '200px'}}
                >
                  {
                    this.state.categoryList.map(item => {
                      return <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="介绍">
              <UEditor id="introduction" height="200"/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否免费">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
                rules: []
              })(
                <Switch />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="普通价格">
              {getFieldDecorator('price', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="会员价格">
              {getFieldDecorator('priceVIP', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="前台显示学习数">
              {getFieldDecorator('learningCount', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否置顶">
              {getFieldDecorator('isTop', {
                valuePropName: 'checked',
                rules: []
              })(
                <Switch/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('showIndex', {
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
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(New);
;
