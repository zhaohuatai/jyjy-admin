import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import {loadDicData, loadProvinceList} from "../../../service/dic";
import {createDataScoreLineProvince} from "../../../service/base";

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
    };
    createDataScoreLineProvince(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
      liberalScienceList: [],
      batchList: [],
    }
  }

  componentDidMount() {
    loadProvinceList({}).then(data => {
      this.setState({provinceList: data.data.provinceList})
    });

    loadDicData({code: "FK"}).then(data => {
      this.setState({liberalScienceList: data.data.dicData})
    });

    loadDicData({code: "PC"}).then(data => {
      this.setState({batchList: data.data.dicData})
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
            <FormItem{...formItemLayout} label="省份">
              {getFieldDecorator('provinceCode', {
                initialValue: '',
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="选择省份" style={{width: '200px'}}>
                  {
                    this.state.provinceList.map(item => {
                      return <Select.Option key={item.id} value={`${item.code}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="分科">
              {getFieldDecorator('subjectCode', {
                initialValue: '',
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="选择分科" style={{width: '200px'}}>
                  {
                    this.state.liberalScienceList.map(item => {
                      return <Select.Option key={item.id} value={`${item.itemCode}`}>{item.itemValue}</Select.Option>
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
            <FormItem{...formItemLayout} label="招生批次">
              {getFieldDecorator('batchCode', {
                initialValue: '',
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="选择批次" style={{width: '200px'}}>
                  {
                    this.state.universityList.map(item => {
                      return <Select.Option key={item.id} value={`${item.itemCode}`}>{item.itemValue}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="分数">
              {getFieldDecorator('scoreLine', {
                initialValue: '',
                rules: []
              })(
                <Input/>
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

export default Form.create()(New);