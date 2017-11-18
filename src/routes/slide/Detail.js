import React, { Component } from 'react';
import { Form, Col, Row, Modal,Collapse} from 'antd';
import { API_DOMAIN } from '../../utils/config';

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
    const { imgUrl, title, content, } = this.props.data;

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
              <p>{title}</p>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="分类"
            >
              <img style={{ width: '100px', height: '100px' }} src={`${API_DOMAIN}${imgUrl}`} />
            </FormItem>
          </Col >
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              <Collapse>
                <Panel header="点击查看详情" key="1">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
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
