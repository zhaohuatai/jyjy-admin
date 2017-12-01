import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';
import {IMG_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {
      title, remark, coverUrl, freePay, isTop, showIndex, introduction, price, priceVIP, cateName
    } = this.props.data;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
      style: {
        marginBottom: '8px'
      }
    };

    return (
      <Modal title="高校信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="服务名">
              <p>{title}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="封面">
              <img style={{width: '100px', height: '100px'}} src={`${IMG_DOMAIN}${coverUrl}`}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="栏目">
              <p>{cateName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="图文简介">
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{__html: introduction}}/>
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="免费服务">
              <p>{freePay === 1 ? "否" : "是"}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="价格">
              <p>{price}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="会员价格">
              <p>{priceVIP}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否置顶">
              <p>{isTop === 1 ? "是" : "否"}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              <p>{showIndex}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
              <p>{remark}</p>
            </FormItem>
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default Form.create()(Detail);