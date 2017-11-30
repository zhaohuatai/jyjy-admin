import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row} from 'antd';
import UEditor from "../../../components/editor/UEditor";
import LazyLoad from 'react-lazy-load';
import {createEnrollAutoRecruitBrochure} from "../../../service/autoSelf";
import {loadDataUniversityDataSet} from "../../../service/base";


const FormItem = Form.Item;

class New extends Component {

  handleSubmit = () => {
    let formData = this.props.form.getFieldsValue();

    formData = {
      ...formData,
      content: UE.getEditor('new_brochureContent').getContent(),
    };

    createEnrollAutoRecruitBrochure(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      universityList: [],
    }
  }

  componentDidMount() {
    loadDataUniversityDataSet({rows: 10000}).then(data => {
      this.setState({universityList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    });
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
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {required: true, message: '请输入标题'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="学校">
              {getFieldDecorator('universityId', {
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="选择学校" style={{width: '200px'}}>
                  {
                    this.state.universityList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="年份">
              {getFieldDecorator('years', {
                initialValue: '',
                rules: [{
                  required: true, message: '请填写年份'
                }]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="new_brochureContent"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: '',
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
