import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {
  createDataProfession,
  loadDataProfessionCategoryDataSet,
  loadDataProfessionSubjectDataSet
} from '../../../service/base';
import LazyLoad from 'react-lazyload';


const FormItem = Form.Item;

class New extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      detail: UE.getEditor('detail').getContent(),
      offer: UE.getEditor('offer').getContent(),
    };

    createDataProfession(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      subjectList: [],
      categoryList: [],
    }
  }

  componentDidMount() {
    loadDataProfessionCategoryDataSet({}).then(data => {
      this.setState({categoryList: data.data.dataSet.rows})
    });

    loadDataProfessionSubjectDataSet({}).then(data => {
      this.setState({subjectList: data.data.dataSet.rows})
    });
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
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="专业名称">
              {getFieldDecorator('profession', {
                initialValue: '',
                rules: [{
                  required: true, message: '请填写'
                }]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="专业代码">
              {getFieldDecorator('liberalScienceCode', {
                initialValue: '',
                rules: [{
                  required: true, message: '请填写'
                }]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所属学科">
              {getFieldDecorator('subjectCode', {
                initialValue: '',
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="选择学科" style={{width: '200px'}}>
                  {
                    this.state.subjectList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所属门类">
              {getFieldDecorator('categoryCode', {
                initialValue: '',
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="选择门类" style={{width: '200px'}}>
                  {
                    this.state.categoryList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="修业年限">
              {getFieldDecorator('revisedYears', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="授予学位">
              {getFieldDecorator('degree', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="毕业5年薪酬">
              {getFieldDecorator('salary', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="本科专业">
              {getFieldDecorator('offer', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="专业详情">
              {getFieldDecorator('undergradPro', {
                initialValue: '',
                rules: []
              })(
                <LazyLoad once>
                  <UEditor id="detail" height="400"/>
                </LazyLoad>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="开设院校">
              {getFieldDecorator('offer', {
                initialValue: '',
                rules: []
              })(
                <LazyLoad once>
                  <UEditor id="offer" height="200"/>
                </LazyLoad>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
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

export default Form.create()(New);;
