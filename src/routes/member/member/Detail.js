import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';
import {IMG_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { title, price, priceVIP, coverUrl, introduction, remark } = this.props.data;

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
      <Modal title="高校信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{ marginBottom: '5px'}}>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              <p>{title}</p>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="封面图片"
            >
              <img style={{width: '100px', height: '100px'}} src={`${IMG_DOMAIN}${coverUrl}`}/>
            </FormItem>
          </Col >

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="学生人数"
            >
              <p>{price / 100}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="院校排名"
            >
              <p>{priceVIP / 100}</p>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="服务内容"
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
              label="备注"
            >
              <p>{remark}</p>
            </FormItem>
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default Form.create()(New);
