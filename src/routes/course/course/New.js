import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Row, Select, Switch, Upload} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {createServiceCourse, loadServiceCourseCategoryDataSet} from "../../../service/course";
import {loadMemberTeacherDataSet} from '../../../service/member';
import {API_DOMAIN} from "../../../utils/config";
import LazyLoad from 'react-lazy-load';


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
    loadServiceCourseCategoryDataSet({rows: 10000}).then(data => {
      this.setState({categoryList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })
    loadMemberTeacherDataSet({rows: 10000}).then(data => {
      this.setState({teacher_list: data.data.dataSet.rows})
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

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData = {
      ...formData,
      introduction: UE.getEditor('new_courseIntroduction').getContent(),
      freePay: formData.freePay ? 0 : 1,
      isTop: formData.isTop ? 1 : 0,
    };

    if (formData.coverUrl) {
      formData.coverUrl = formData.coverUrl[0].response.data.image;
    }

    createServiceCourse(formData).then(data => {
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
      <div>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="课程名">
              {getFieldDecorator('name', {
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
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('hint', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="选择分类">
              {getFieldDecorator('categoryId', {
                initialValue: '',
                rules: [
                  {required: true, message: '请选择分类'},
                ]
              })(
                <Select
                  placeholder="选择分类"
                  style={{width: '200px'}}
                >
                  {
                    this.state.categoryList.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.categoryName}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="选择主讲人">
              {getFieldDecorator('presenterId', {
                initialValue: '',
              })(
                <Select
                  placeholder="选择分类"
                  style={{width: '200px'}}
                >
                  {
                    this.state.teacher_list.map(item => {
                      return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="课程封面"
            >
              {getFieldDecorator('coverUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: '',
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/course/serviceCourse/uploadCover`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="前台显示学习人数">
              {getFieldDecorator('learningCount', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否置顶">
              {getFieldDecorator('isTop', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('showIndex', {
                initialValue: '',
                rules: []
              })(
                <Input/>
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
          <Col span={24}>
            <FormItem {...formItemLayout} label="介绍">
              <LazyLoad height={370}>
                <UEditor id="new_courseIntroduction"/>
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
