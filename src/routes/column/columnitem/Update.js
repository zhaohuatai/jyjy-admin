import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Modal, Row, Select, Switch, Upload} from 'antd';
import {loadColumnChannelDataSet, updateColumnChannelItem} from "../../../service/column";
import {loadMemberTeacherDataSet} from "../../../service/member";
import UEditor from "../../../components/editor/UEditor";
import LazyLoad from 'react-lazy-load';
import {API_DOMAIN} from "../../../utils/config";

const FormItem = Form.Item;

class New extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channelList: [],
    }
  }

  componentDidMount() {
    loadColumnChannelDataSet({rows: 10000, status: 1}).then(data => {
      this.setState({channelList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...this.props.data,
      ...formData,
      freePay: formData.freePay ? 0 : 1,
      content: UE.getEditor("update_columnItemContent").getContent(),
      coverUrl: formData.coverUrl ? formData.coverUrl[0].response.data.image : this.props.data.coverUrl,
      thumbnailUrl: formData.thumbnailUrl ? formData.thumbnailUrl[0].response.data.image : this.props.data.thumbnailUrl,
      price: formData.price * 100,
      priceVIP: formData.priceVIP * 100,
    };

    updateColumnChannelItem(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, channelId, hint, content, itemOrder, presenterId, freePay, price, priceVIP, remark} = this.props.data;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
    };

    return (
      <Modal title="更新专栏单期" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [
                  {required: true, message: '请输入标题'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('hint', {
                initialValue: hint,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="封面">
              {getFieldDecorator('coverUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/channel/columnChannelItem/uploadCover`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="缩略图">
              {getFieldDecorator('thumbnailUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: ''
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/channel/columnChannel/uploadThumbnail`}
                  listType="picture"
                  withCredentials={true}
                >
                  <Button>
                    <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="所属专栏">
              {getFieldDecorator('channelId', {
                initialValue: channelId + '',
                rules: [
                  {required: true, message: '请选择'},
                ]
              })(
                <Select placeholder="选择专栏" style={{width: '200px'}}>{
                  this.state.channelList.map(item => {
                    return <Select.Option key={item.id} value={`${item.id}`}>{item.title}</Select.Option>
                  })
                }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="排序">
              {getFieldDecorator('itemOrder', {
                initialValue: itemOrder,
              })(
                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="update_columnItemContent" initValue={content}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="免费">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
                initialValue: !freePay,
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="普通价格">
              {getFieldDecorator('price', {
                initialValue: price / 100,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="会员价格">
              {getFieldDecorator('priceVIP', {
                initialValue: priceVIP / 100,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: remark,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(New);
