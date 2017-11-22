import React, {Component} from 'react';
import {API_DOMAIN} from '../../utils/config';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Select, Switch, Upload} from 'antd';
import UEditor from '../../components/editor/UEditor';
import {updateDataUniversity} from '../../service/university';
import {loadProvinceList} from '../../service/dic';

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

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      faculty: UE.getEditor('update_faculty').getContent(),
      specialProfession: UE.getEditor('update_specialProfession').getContent(),
      introduction: UE.getEditor('update_introduction').getContent(),
    };

    formData.firstRate ? formData.firstRate = 1 : formData.firstRate = 0;
    formData.id = this.props.data.id;

    console.log(formData);
    if (formData.badge) {
      formData.badge = formData.badge[0].response.data.image;
    }

    updateDataUniversity(formData).then(data => {
      this.props.form.resetFields();
      this.props.oncancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { attached, badge, establishTime, faculty, academicianNum,
      firstRate, introduction, location, masterNum,
      name, phone, provinceCode, province, rank,
      remark, doctor, specialProfession, stage, studentNum, type } = this.props.data;

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

    let provinceMenu = (
      this.state
    )

    return(
      <Modal
        title="更新高校信息"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width={'80%'}
      >
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="校名"
            >
              {getFieldDecorator('name',{
                initialValue: name,
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
                initialValue: provinceCode,
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
                initialValue: firstRate ? true : false,
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校层次"
            >
              {getFieldDecorator('stage',{
                initialValue: stage,
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
                initialValue: type,
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
                initialValue: phone,
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
                initialValue: location,
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
                initialValue: doctor,
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
                initialValue: masterNum,
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
                initialValue: academicianNum,
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
                initialValue: studentNum,
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
                initialValue: rank,
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
                initialValue: establishTime,
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
                initialValue: attached,
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
                initialValue: remark,
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
              <UEditor id="update_specialProfession" height="200" initValue={specialProfession} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校简介"
            >
              <UEditor id="update_introduction" height="200" initValue={introduction} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="师资力量"
            >
              <UEditor id="update_faculty" height="200" initValue={faculty} />
            </FormItem>
          </Col>
        </Row>
        <FormItem
          wrapperCol={{ span: 12, offset: 4 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);;
