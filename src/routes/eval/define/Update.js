import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {updateEvalDefineResultConclusion} from '../../../service/eval';
import LazyLoad from 'react-lazy-load';

const FormItem = Form.Item;

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList:[]
    }
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...this.props.data,
      ...formData,
      resultConclusion: UE.getEditor('update_eval_define').getContent(),
    };

    updateEvalDefineResultConclusion(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  componentDidMount() {
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { resultConclusion, resultCode, categroyId} = this.props.data;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return(
      <Modal title="更新" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="代码"
            >
              <p>{resultCode}</p>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              <LazyLoad height={370}>
                <UEditor id="update_eval_define" initValue={resultConclusion}/>
              </LazyLoad>
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