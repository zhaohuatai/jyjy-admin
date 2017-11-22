import React, {Component} from 'react';
import {API_DOMAIN} from '../../../utils/config';
import {Col, Collapse, Form, message, Modal, Row, Select, Switch} from 'antd';
import {updateDataUniversity} from '../../../service/university';
import {loadProvinceList} from '../../../service/dic';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;

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
      style: {
        marginBottom: '8px'
      }
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
              <p>{name}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="省份"
            >
              <p>{province}</p>
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="校徽图片"
            >
              <img style={{width: '100px', height: '100px'}} src={`${API_DOMAIN}${badge}`} />
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="是否双一流"
            >
              <Switch checked={firstRate}/>
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="阶段"
            >
              <p>{stage}</p>
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="办学类型"
            >
              <p>{type}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="招生办电话"
            >
              <p>{phone}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校地址"
            >
              <p>{location}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="博士点数"
            >
              <p>{doctor}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="硕士点数"
            >
              <p>{masterNum}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="院士人数"
            >
              <p>{academicianNum}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学生人数"
            >
              <p>{studentNum}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="院校排名"
            >
              <p>{rank}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="建校时间"
            >
              <p>{establishTime}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校隶属"
            >
              <p>{attached}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              <p>{remark}</p>
            </FormItem>

          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="特色专业"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: specialProfession }} />
                </Panel>
              </Collapse>

            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学校简介"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: introduction }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="师资力量"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: faculty }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default Form.create()(New);;
