import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {
  loadDataProfessionCategoryDataSet, loadDataProfessionSubjectDataSet,
  updateDataProfession
} from '../../../service/base';
import LazyLoad from 'react-lazy-load';

const FormItem = Form.Item;

class Update extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...this.props.data,
      ...formData,
      detail: UE.getEditor('update_professionDetail').getContent(),
      offer: UE.getEditor('update_professionOffer').getContent(),
    };

    updateDataProfession(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
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
    loadDataProfessionCategoryDataSet({rows: 10000, status: 1}).then(data => {
      this.setState({categoryList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    });

    loadDataProfessionSubjectDataSet({rows: 10000, status: 1}).then(data => {
      this.setState({subjectList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {profession, professionCode, subjectCode, categoryCode, revisedYears, degree, detail, salary, offer, undergradPro, remark} = this.props.data;

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
      <Modal title="更新专业信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="专业名称">
              {getFieldDecorator('profession', {
                initialValue: profession,
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
                initialValue: professionCode,
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
                initialValue: subjectCode + '',
                rules: [{
                  required: true, message: '请选择'
                }],
                onChange: (value) => {
                  this.props.form.resetFields(['categoryCode']);
                  loadDataProfessionCategoryDataSet({subjectId: value, rows: 10000, status: 1}).then(data => {
                    this.setState({categoryList: data.data.dataSet.rows})
                  }).catch((e) => {
                    message.error(e);
                  })
                }
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
                initialValue: categoryCode + '',
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="请先选择学科" style={{width: '200px'}}>
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
                initialValue: revisedYears,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="授予学位">
              {getFieldDecorator('degree', {
                initialValue: degree,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="毕业5年薪酬">
              {getFieldDecorator('salary', {
                initialValue: salary,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="本科专业">
              {getFieldDecorator('undergradPro', {
                initialValue: undergradPro,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="专业详情">
              <LazyLoad height={370}>
                <UEditor id="update_professionDetail" initValue={detail}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="开设院校">
              <LazyLoad height={370}>
                <UEditor id="update_professionOffer" initValue={offer}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
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
