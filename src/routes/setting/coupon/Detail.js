import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';
import {IMG_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { name, thumbNailImage, mainImage} = this.props.data;

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
            <FormItem{...formItemLayout} label="校名">
              <p>{name}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              <p>{name}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="校徽图片"
            >
              <img style={{width: '100px'}} src={`${IMG_DOMAIN}${thumbNailImage}`}/>
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="校徽图片"
            >
              <img style={{width: '100px'}} src={`${IMG_DOMAIN}${mainImage}`}/>
            </FormItem>
          </Col >

        </Row>
      </Modal>
    )
  }
}

export default Form.create()(Detail);