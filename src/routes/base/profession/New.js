import React, { Component } from 'react';
import { API_DOMAIN } from '../../../utils/config';
import { Form, Col, Row, Switch, Button, Select, Dropdown, Menu, Upload, Icon, Input} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import { createDataUniversity, uploadBadge } from '../../../service/university';
import { loadProvinceList } from '../../../service/dic';

const FormItem = Form.Item;
const Option = Select.Option;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList:[]
    }
  }


  componentDidMount() {
    loadProvinceList({}).then(data => {
      this.setState({ provinceList: data.data.provinceList})
    })
  }


  testSubmit = () => {
    console.log(UE.getEditor('content').getContent())
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    let formdata = this.props.form.getFieldsValue();
    formdata = { ...formdata,
      faculty: UE.getEditor('faculty').getContent(),
      specialProfession: UE.getEditor('specialProfession').getContent(),
      introduction: UE.getEditor('introduction').getContent(),
    };

    formdata.firstRate ? formdata.firstRate = 1 : formdata.firstRate = 0;

    console.log(formdata);
    formdata.badge = formdata.badge[0].response.data.image;

    createDataUniversity(formdata).then(data => {
      console.log(data);
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

    let provinceMenu = (
      this.state
    )

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
                  { required: true, message: '请输入学校名称' },
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="选择省份"
            >
              {getFieldDecorator('provinceCode',{
                initialValue: '',
                rules: [
                ]
              })(
                <Select
                  placeholder="选择省份"
                  style={{width: '200px'}}
                >
                  {
                    this.state.provinceList.map(item => {
                      return <Option key={item.id} value={item.code}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="校徽图片"
            >
              {getFieldDecorator('badge', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/data/dataUniversity/uploadBadge`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="是否双一流"
            >
              {getFieldDecorator('firstRate',{
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Switch />
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校层次"
            >
              {getFieldDecorator('stage',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="办学类型"
            >
              {getFieldDecorator('type',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="招生办电话"
            >
              {getFieldDecorator('phone',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校地址"
            >
              {getFieldDecorator('location',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="博士点数"
            >
              {getFieldDecorator('doctor',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="硕士点数"
            >
              {getFieldDecorator('masterNum',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="院士人数"
            >
              {getFieldDecorator('academicianNum',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学生人数"
            >
              {getFieldDecorator('studentNum',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="院校排名"
            >
              {getFieldDecorator('rank',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="建校时间"
            >
              {getFieldDecorator('establishTime',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校隶属"
            >
              {getFieldDecorator('attached',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('remark',{
                initialValue: '',
                rules: [
                ]
              })(
                <Input size='default' />
              )}
            </FormItem>

          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="特色专业"
            >
                <UEditor id="specialProfession" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校简介"
            >
              <UEditor id="introduction" height="200" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="师资力量"
            >
              <UEditor id="faculty" height="200" />
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
