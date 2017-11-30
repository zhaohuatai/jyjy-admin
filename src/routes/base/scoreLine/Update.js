import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import {loadDicData} from '../../../service/dic';
import {loadDataUniversityDataSet, updateDataScoreLine} from "../../../service/base";

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData.id = this.props.data.id;

    updateDataScoreLine(formData).then(data => {
      this.props.form.resetFields();
      this.props.oncancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      universityList: [],
      liberalScienceList: [],
      batchList: [],
    }
  }

  componentDidMount() {
    loadDataUniversityDataSet({rows: 10000}).then(data => {
      this.setState({universityList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })

    loadDicData({code: "FK", rows: 10000}).then(data => {
      this.setState({liberalScienceList: data.data.dicData})
    }).catch((e) => {
      message.error(e);
    })

    loadDicData({code: "PC", rows: 10000}).then(data => {
      this.setState({batchList: data.data.dicData})
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {universityId, liberalScienceCode, years, batchCode, highest, lowest, offerNum, remark} = this.props.data;

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
            <FormItem{...formItemLayout} label="学校">
              {getFieldDecorator('universityId', {
                initialValue: universityId,
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
            <FormItem{...formItemLayout} label="分科">
              {getFieldDecorator('liberalScienceCode', {
                initialValue: liberalScienceCode,
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
            <FormItem{...formItemLayout} label="批次">
              {getFieldDecorator('batchCode', {
                initialValue: batchCode,
                rules: []
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
            <FormItem{...formItemLayout} label="最高分">
              {getFieldDecorator('highest', {
                initialValue: highest,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="最低分">
              {getFieldDecorator('lowest', {
                initialValue: lowest,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="录取数">
              {getFieldDecorator('offerNum', {
                initialValue: offerNum,
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

export default Form.create()(New);
