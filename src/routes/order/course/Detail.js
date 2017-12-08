import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';
import {IMG_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;
const Panel = Collapse.Panel;

/*
"serviceCourseOrder":{
			"member":{
				"birthday":"",
				"clazz":"4",
				"createTime":"2017-12-07 14:34:41",
				"currentMoney":0,
				"email":"",
				"id":88,
				"idNum":"",
				"introducer":"",
				"invitationCode":"bxx5m3",
				"isEnabled":"",
				"name":"quhao",
				"nickName":"",
				"openId":"o_5Xe0RX9zck4HTkyBhc39uOT0z4",
				"phone":"18953136382",
				"point":0,
				"profilePicture":"",
				"recordTime":1512705310799,
				"schoolName":"quhao",
				"sex":"",
				"status":1,
				"type":"",
				"updateTime":"",
				"vipLevel":1
			},
			"serviceCourseOrder":{
				"createTime":"2017-12-07 15:32:22",
				"id":75,
				"invitationCode":"",
				"invoiceTitle":"",
				"isDeleted":"1",
				"isEnabled":"",
				"isInvoice":"0",
				"memberCouponIds":"",
				"memberId":88,
				"memberName":"quhao",
				"memo":"",
				"orderStatus":"2",
				"orderTime":"2017-12-07 15:32:22",
				"ordersn":"1712071532220000000000076",
				"payFee":1,
				"paymentStatus":"2",
				"paymentTime":"2017-12-07 15:57:59",
				"paymentType":"1",
				"recordTime":1512705310799,
				"remark":"",
				"status":"",
				"tradeNo":"",
				"transactionId":"4200000045201712079673933381",
				"updateTime":"2017-12-07 15:57:59",
				"wxPrepayId":"wx201712071557592381f0308f0073197779"
			},
			"serviceCourseOrderItemsList":[
				{
					"serviceCourseItem":{
						"courseId":1,
						"courseName":"",
						"coverUrl":"",
						"createTime":"",
						"creator":"",
						"freePay":1,
						"hint":"d22",
						"id":1,
						"introduction":"<p>asdsa<br/></p>",
						"isEnabled":"",
						"itemOrder":1,
						"name":"物理第一节课",
						"presenterId":5,
						"presenterName":"",
						"price":5,
						"priceVIP":2,
						"recordTime":1512705310799,
						"remark":"",
						"status":1,
						"tryVideoUrl":"",
						"updateTime":"2017-12-06 18:55:16",
						"videoAliId":"24788ae4ccb24c7e94a6357c03fc4148",
						"videoDesc":"1 111.mp4",
						"videoName":"1 111.mp4",
						"videoSize":"",
						"videoTags":"1 111.mp4",
						"videoTime":"",
						"videoTitle":"1 111.mp4",
						"videoUrl":"asdasd"
					},
					"serviceCourseOrderItems":{
						"courseId":1,
						"courseItemId":1,
						"finalPrice":5,
						"id":1,
						"isEnabled":"",
						"memberId":88,
						"orderId":75,
						"payFee":5,
						"recordTime":1512705310799,
						"status":""
					}
				}
			]
		}
* */

class Detail extends Component {

  render() {
    const {serviceCourseOrderItemsList, serviceCourseOrder, member} = this.props.data;

    const {ordersn, wxPrepayId, memberCouponIds, orderStatus, createTime, memo} = serviceCourseOrder;
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
                serviceCourseOrderItemsList.map(item => {
                  return (
                    <div key={item.serviceCourseItem.id}>
                      <span>{item.serviceCourseItem.name}</span>
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
