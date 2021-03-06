import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {loadInterlocutionCategoryDataSet, updateInterlocution} from "../../../service/interlocution";

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      interAnswer: UE.getEditor('update_interAnswer').getContent(),
      id: this.props.data.id,
    }

    updateInterlocution(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      category: []
    }
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  componentDidMount() {
    loadInterlocutionCategoryDataSet({status: 1}).then(data => {
      this.setState({category: data.data.dataSet.rows})
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const { interQuestion, interAnswer, categoryId, remark} = this.props.data;

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
      <Modal title="更新高校信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="问题">
              {getFieldDecorator('interQuestion', {
                initialValue: interQuestion,
                rules: [
                  {required: true, message: '请输入问题'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="所属分类"
            >
              {getFieldDecorator('categoryId', {
                initialValue: `${categoryId}`,
                rules: [
                  {required: true, message: '请选择分类'},
                ]
              })(
                <Select placeholder="选择分类" style={{width: '200px'}}>
                  {
                    this.state.category.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.categoryName}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="回答">
              <UEditor id="update_interAnswer" initValue={interAnswer}/>
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
