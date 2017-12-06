import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList:[]
    }
  }

  render() {
    const { categoryName, name, back, course, definition, duty, fore, intro, money, moral, qualify, skill, tools, claim, local } = this.props.data;

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

    return(
      <Modal
        title="职业详情"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width={'80%'}
      >
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="职业"
            >
              <p>{name}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="分类"
            >
              <p>{categoryName}</p>
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学历要求"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: back }} />
                </Panel>
              </Collapse>

            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主要课程"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: course }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="职业定义"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: definition }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工作内容"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: duty }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="个人发展路径"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: fore }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="简介"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: intro }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="薪酬结构"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: money }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="主要职责"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: moral }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="资格"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: qualify }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="技能"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: skill }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工具"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: tools }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="要求"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: claim }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="工作地点"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: local }} />
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default New
