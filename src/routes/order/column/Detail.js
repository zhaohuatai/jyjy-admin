import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';
import {IMG_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Detail extends Component {

  render() {
    const {columnChannelItemResDtoList, columnChannelOrder, member} = this.props.data;

    const {ordersn, wxPrepayId, memberCouponIds, orderStatus, createTime, memo} = columnChannelOrder;
    const {name, phone, point, schoolName, vipLevel} = member;

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
        title="订单详情"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width="60%"
      >
        <Row type="flex" style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="用户">
              <p>{name}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="订单编号">
              <p>{ordersn}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="订单内容">
              {
                columnChannelItemResDtoList.map(item => {
                  return (
                    <div key={item.columnChannelItem.id}>
                      <img style={{width: '40px', height: '40px'}} src={`${IMG_DOMAIN}${item.columnChannelItem.coverUrl}`}/> <span>{item.columnChannelItem.title}</span>
                    </div>
                  )
                })
              }
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="微信下单id">
              <p>{wxPrepayId}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所用优惠券">
              <p>{memberCouponIds}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="创建时间">
              <p>{createTime}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="留言">
              <p>{memo}</p>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem{...formItemLayout} label="用户学校">
              <p>{schoolName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="用户电话">
              <p>{phone}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="用户会员级别">
              <p>{vipLevel}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="用户积分">
              <p>{point}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="用户电话">
              <p>{phone}</p>
            </FormItem>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default Detail;
