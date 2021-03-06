import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import {loadDicData, loadProvinceList} from '../../../service/dic';
import {updateDataScoreLineProvince} from "../../../service/base";

const FormItem = Form.Item;

class Update extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData.id = this.props.data.id;

    updateDataScoreLineProvince(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
      liberalScienceList: [],
      batchList: [],
    }
  }

  componentDidMount() {
    loadProvinceList({rows: 10000, status: 1}).then(data => {
      this.setState({provinceList: data.data.provinceList})
    });

    loadDicData({code: "FK", rows: 10000}).then(data => {
      this.setState({liberalScienceList: data.data.dicData})
    });

    loadDicData({code: "PC", rows: 10000}).then(data => {
      this.setState({batchList: data.data.dicData})
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {provinceCode, subjectCode, years, batchCode, scoreLine, remark} = this.props.data;

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
      <Modal title="更新分数线数据" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="省份">
              {getFieldDecorator('provinceCode', {
                initialValue: provinceCode + '',
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
                initialValue: subjectCode + '',
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
                initialValue: years,
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
                initialValue: batchCode + '',
                rules: [{
                  required: true, message: '请选择'
                }]
              })(
                <Select placeholder="选择批次" style={{width: '200px'}}>
                  {
                    this.state.batchList.map(item => {
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
                initialValue: scoreLine,
                rules: []
              })(
                <Input/>
              )}
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
