import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import LazyLoad from 'react-lazy-load';
import {createPubNews, loadPubNewsCategoryDataSet} from "../../../service/news";

const FormItem = Form.Item;

class New extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      content: UE.getEditor('custimise_news_content').getContent(),
    };

    createPubNews(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  constructor(props) {
    super(props);
    this.state = {
      category: []
    }
  }

  componentDidMount() {
    loadPubNewsCategoryDataSet({rows: 10000, status: 1}).then(data => {
      this.setState({category: data.data.dataSet.rows})
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
            <FormItem
              {...formItemLayout}
              label="标题">
              {getFieldDecorator('title', {
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
            <FormItem
              {...formItemLayout}
              label="所属分类"
            >
              {getFieldDecorator('categoryId', {
                rules: [
                  {required: true, message: '请选择分类'},
                ]
              })(
                <Select placeholder="选择分类" style={{width: '200px'}}>
                  {
                    this.state.category.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="custimise_news_content"/>
              </LazyLoad>
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