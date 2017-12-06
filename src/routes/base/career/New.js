import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {createDataCareer, loadDataCareerCategoryDataSet} from '../../../service/base';
import LazyLoad from 'react-lazy-load';

const FormItem = Form.Item;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList:[]
    }
  }

  componentDidMount() {
    loadDataCareerCategoryDataSet({rows: 1000}).then(data => {
      this.setState({ categoryList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      back: UE.getEditor('new_career_back').getContent(),
      dataSet: UE.getEditor('new_career_course').getContent(),
      definition: UE.getEditor('new_career_definition').getContent(),
      duty: UE.getEditor('new_career_duty').getContent(),
      fore: UE.getEditor('new_career_fore').getContent(),
      intro: UE.getEditor('new_career_intro').getContent(),
      money: UE.getEditor('new_career_money').getContent(),
      moral: UE.getEditor('new_career_moral').getContent(),
      qualify: UE.getEditor('new_career_qualify').getContent(),
      skill: UE.getEditor('new_career_skill').getContent(),
      tools: UE.getEditor('new_career_tools').getContent(),
      claim: UE.getEditor('new_career_claim').getContent(),
      local: UE.getEditor('new_career_local').getContent(),
    };

    createDataCareer(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return(
      <div>
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="职业"
            >
              {getFieldDecorator('name',{
                initialValue: '',
                rules: [
                  { required: true, message: '请输入名称' },
                ]
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="选择分类"
            >
              {getFieldDecorator('categoryId',{
                rules: [
                  { required: true, message: '请选择分类' },
                ]
              })(
                <Select
                  placeholder="选择分类"
                  style={{width: '200px'}}
                >
                  {
                    this.state.categoryList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('remark',{
                initialValue: '',
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="学历要求">
              <LazyLoad height={370}>
                <UEditor id="new_career_back"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主要课程">
              <LazyLoad height={370}>
                <UEditor id="new_career_course"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="职业定义">
              <LazyLoad height={370}>
                <UEditor id="new_career_definition"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="工作内容">
              <LazyLoad height={370}>
                <UEditor id="new_career_duty"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="个人发展路径">
              <LazyLoad height={370}>
                <UEditor id="new_career_fore"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_intro"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="薪酬结构"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_money"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主要职责"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_moral"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="资格"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_qualify"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="技能"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_skill"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工具"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_tools"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="要求"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_claim"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工作地点"
            >
              <LazyLoad height={370}>
                <UEditor id="new_career_local"/>
              </LazyLoad>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          wrapperCol={{ span: 12, offset: 4 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(New);