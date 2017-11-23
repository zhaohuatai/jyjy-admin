import React, {Component} from 'react';
import {Col, Collapse, Form, Modal, Row} from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList:[]
    }
  }

  render() {
    const {
      freePay, coverUrl, name, courseId, introduction,
      presenterName, remark, videoAliId, videoDesc, price, priceVIP,
      videoName, videoSize, videoTags, videoTime, showIndex,
      videoTitle, videoUrl
    } = this.props.data;

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
        title="详情"
        visible={this.props.show}
        onCancel={this.props.onCancel}
        footer={null}
        width={'80%'}
      >
        <Row type='flex' style={{ marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              <p>{name}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所属课程Id">
              <p>{courseId}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主讲人">
              <p>{presenterName}</p>
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
            <FormItem
              {...formItemLayout}
              label="权重"
            >
              <p>{showIndex}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="阿里视频id"
            >
              <p>{videoAliId}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频描述"
            >
              <p>{videoDesc}</p>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频名称"
            >
              <p>{videoName}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频大小"
            >
              <p>{videoSize}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频标题"
            >
              <p>{videoTitle}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频地址"
            >
              <p>{videoUrl}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频标签"
            >
              <p>{videoTags}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="视频时间"
            >
              <p>{videoTime}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: introduction }} />
                </Panel>
              </Collapse>

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
