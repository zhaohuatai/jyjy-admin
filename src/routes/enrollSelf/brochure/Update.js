import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import LazyLoad from 'react-lazy-load';
import {updateEnrollAutoRecruitBrochure} from "../../../service/autoSelf";
import {loadDataUniversityDataSet} from "../../../service/base";

const FormItem = Form.Item;

class Update extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData = {
      ...this.props.data,
      ...formData,
      content: UE.getEditor('update_brochureContent').getContent(),
    };

    updateEnrollAutoRecruitBrochure(formData).then(data => {
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
    const {title, content, remark} = this.props.data;

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
      <Modal title="更新" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
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
            <FormItem{...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="update_brochureContent" initValue={content}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: remark,
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