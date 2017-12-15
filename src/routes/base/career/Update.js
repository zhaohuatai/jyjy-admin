import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {loadDataCareerCategoryDataSet, updateDataCareer} from '../../../service/base';
import LazyLoad from 'react-lazy-load';

const FormItem = Form.Item;

class Update extends Component {
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...this.props.data,
      ...formData,
      back: UE.getEditor('update_career_back').getContent(),
      course: UE.getEditor('update_career_course').getContent(),
      definition: UE.getEditor('update_career_definition').getContent(),
      duty: UE.getEditor('update_career_duty').getContent(),
      fore: UE.getEditor('update_career_fore').getContent(),
      intro: UE.getEditor('update_career_intro').getContent(),
      money: UE.getEditor('update_career_money').getContent(),
      moral: UE.getEditor('update_career_moral').getContent(),
      qualify: UE.getEditor('update_career_qualify').getContent(),
      skill: UE.getEditor('update_career_skill').getContent(),
      tools: UE.getEditor('update_career_tools').getContent(),
      claim: UE.getEditor('update_career_claim').getContent(),
      local: UE.getEditor('update_career_local').getContent(),
    };

    updateDataCareer(formData).then(data => {
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
      categoryList: []
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
    loadDataCareerCategoryDataSet({rows: 10000, status: 1}).then(data => {
      this.setState({categoryList: data.data.dataSet.rows})
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {categoryId, name, back, remark, course, definition, duty, fore, intro, money, moral, qualify, skill, tools, claim, local} = this.props.data;

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
      <Modal title="更新职业信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="职业"
            >
              {getFieldDecorator('name',{
                initialValue: name,
                rules: [
                  {required: true, message: '请输入名称'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="选择分类"
            >
              {getFieldDecorator('categoryId', {
                initialValue: `${categoryId}`,
                rules: [
                  {required: true, message: '请选择'},
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
              {getFieldDecorator('remark', {
                initialValue: remark,
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="学历要求">
              <LazyLoad height={370}>
                <UEditor id="update_career_back" initValue={back}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主要课程">
              <LazyLoad height={370}>
                <UEditor id="update_career_course" initValue={course}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="职业定义">
              <LazyLoad height={370}>
                <UEditor id="update_career_definition" initValue={definition}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="工作内容">
              <LazyLoad height={370}>
                <UEditor id="update_career_duty" initValue={duty}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="个人发展路径">
              <LazyLoad height={370}>
                <UEditor id="update_career_fore" initValue={fore}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_intro" initValue={intro}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="薪酬结构"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_money" initValue={money}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主要职责"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_moral" initValue={moral}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="资格"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_qualify" initValue={qualify}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="技能"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_skill" initValue={skill}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工具"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_tools" initValue={tools}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="要求"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_claim" initValue={claim}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工作地点"
            >
              <LazyLoad height={370}>
                <UEditor id="update_career_local" initValue={local}/>
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