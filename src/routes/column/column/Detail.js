import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class New extends Component {

  render() {
    const {
      title, hint, presenterName, introduction, price, priceVIP,
      learningCount, learningCountActual, favoriteCount, coverUrl, freePay, remark, isTop, showIndex
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
        marginBottom: '8px',
      },
    };

    return (
      <Modal
        title="详情"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width="80%"
      >
        <Row type="flex" style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="课程名">
              <p>{title}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="描述">
              <p>{hint}</p>
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
                  <div dangerouslySetInnerHTML={{__html: introduction}}/>
                </Panel>
              </Collapse>
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
            <FormItem{...formItemLayout} label="前台显示学习数">
              <p>{learningCount}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="实际学习人数">
              <p>{learningCountActual}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="收藏数">
              <p>{favoriteCount}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="免费">
              {freePay ? "否" : "是"}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="置顶">
              {isTop ? "是" : "否"}
            </FormItem>
          </Col><Col span={24}>
          <FormItem{...formItemLayout} label="显示顺序">
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
    );
  }
}

export default New;
