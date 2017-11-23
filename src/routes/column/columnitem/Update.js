import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import {loadColumnChannelDataSet, updateColumnChannelItem} from "../../../service/column";
import {loadMemberTeacherDataSet} from "../../../service/member";

const FormItem = Form.Item;

class New extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData.id = this.props.data.id;

    updateColumnChannelItem(formData).then(data => {
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
      channelList: [],
      presenterList: []
    }
  }

  componentDidMount() {
    loadColumnChannelDataSet({rows: 100}).then(data => {
      this.setState({channelList: data.data.dataSet.rows})
    });

    loadMemberTeacherDataSet({rows: 100}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, channelId, hint, itemOrder, presenterId, freePay, price, priceVIP, remark} = this.props.data;

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
      <Modal title="更新专栏一期" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [
                  {required: true, message: '请输入标题'},
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
            <FormItem{...formItemLayout} label="所属专栏">
              {getFieldDecorator('channelId', {
                initialValue: channelId,
                rules: [
                  {required: true, message: '请选择'},
                ]
              })(
                <Select placeholder="选择专栏" style={{width: '200px'}}>{
                  this.state.channelList.map(item => {
                    return <Select.Option key={item.id} value={`${item.id}`}>{item.title}</Select.Option>
                  })
                }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="节次">
              {getFieldDecorator('itemOrder', {
                initialValue: itemOrder,
              })(
                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主讲人">
              {getFieldDecorator('presenterId', {
                initialValue: presenterId,
                rules: [
                  {required: true, message: '请选择'},
                ]
              })(
                <Select placeholder="选择主讲人" style={{width: '200px'}}>{
                  this.state.presenterList.map(item => {
                    return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                  })
                }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="免费">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
                initialValue: !freePay,
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="普通价格">
              {getFieldDecorator('price', {
                initialValue: price,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="会员价格">
              {getFieldDecorator('priceVIP', {
                initialValue: priceVIP,
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
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);
