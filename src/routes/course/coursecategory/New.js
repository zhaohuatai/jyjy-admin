import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row} from 'antd';
import {createServiceCourseCategory} from "../../../service/course";

const FormItem = Form.Item;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      teacher_list: []
    }
  }

  componentDidMount() {

  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    createServiceCourseCategory(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
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
      <Modal title="详情" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width="80%">
        <div>
          <Row type='flex' style={{marginBottom: '5px'}}>
            <Col span={24}>
              <FormItem{...formItemLayout} label="分类名">
                {getFieldDecorator('categoryName', {
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
              <FormItem {...formItemLayout} label="显示顺序">
                {getFieldDecorator('showIndex', {
                  initialValue: '',
                  rules: []
                })(
                  <Input type='number'/>
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
      </Modal>
    )
  }
}

export default Form.create()(New);
