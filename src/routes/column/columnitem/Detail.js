import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';
import {IMG_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
    }
  }

  render() {
    const {title, channel, coverUrl, hint, content, itemOrder, presenterName, commentCount, freePay, price, priceVIP, remark, thumbnailUrl} = this.props.data;

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
      <Modal
        title="详情"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width={'80%'}
      >
        <Row type="flex" style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="封面">
              <img style={{width: '100px', height: '100px'}} src={`${IMG_DOMAIN}${coverUrl}`}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="封面">
              <img style={{width: '100px', height: '100px'}} src={`${IMG_DOMAIN}${thumbnailUrl}`}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              <p>{title}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="描述">
              <p>{hint}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所属专栏">
              <p>{channel}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="期数">
              <p>{itemOrder}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主讲人">
              <p>{presenterName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="介绍">
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{__html: content}}/>
                </Panel>
              </Collapse>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="免费">
              {freePay ? "否" : "是"}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="普通价格">
              <p>{price}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="会员价格">
              <p>{priceVIP}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="评论数">
              <p>{commentCount}</p>
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

export default Detail
