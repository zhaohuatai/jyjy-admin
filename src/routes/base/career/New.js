import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {createDataCareer, loadDataCareerCategoryDataSet} from '../../../service/career';

const FormItem = Form.Item;
const Option = Select.Option;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList:[]
    }
  }

  componentDidMount() {
    loadDataCareerCategoryDataSet({rows: 100}).then(data => {
      this.setState({ categoryList: data.data.dataSet.rows})
    })
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      back: UE.getEditor('career_back').getContent(),
      course: UE.getEditor('career_course').getContent(),
      definition: UE.getEditor('career_definition').getContent(),
      duty: UE.getEditor('career_duty').getContent(),
      fore: UE.getEditor('career_fore').getContent(),
      intro: UE.getEditor('career_intro').getContent(),
      money: UE.getEditor('career_money').getContent(),
      moral: UE.getEditor('career_moral').getContent(),
      qualify: UE.getEditor('career_qualify').getContent(),
      skill: UE.getEditor('career_skill').getContent(),
      tools: UE.getEditor('career_tools').getContent(),
      claim: UE.getEditor('career_claim').getContent(),
      local: UE.getEditor('career_local').getContent(),
    };

    console.log(formData);

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
              label="校名"
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
                initialValue: '',
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
                      return <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
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
            <FormItem
              {...formItemLayout}
              label="学历要求"
            >
                <UEditor id="career_back" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主要课程"
            >
              <UEditor id="career_course" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="职业定义"
            >
              <UEditor id="career_definition" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工作内容"
            >
              <UEditor id="career_duty" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="个人发展路径"
            >
              <UEditor id="career_fore" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              <UEditor id="career_intro" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="薪酬结构"
            >
              <UEditor id="career_money" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主要职责"
            >
              <UEditor id="career_moral" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="资格"
            >
              <UEditor id="career_qualify" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="技能"
            >
              <UEditor id="career_skill" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工具"
            >
              <UEditor id="career_tools" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="要求"
            >
              <UEditor id="career_claim" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工作地点"
            >
              <UEditor id="career_local" height="200" />
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

export default Form.create()(New);;
