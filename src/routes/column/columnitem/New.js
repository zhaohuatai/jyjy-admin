import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Row, Select, Switch, Upload} from 'antd';
import {loadMemberTeacherDataSet} from "../../../service/member";
import {createColumnChannelItem, loadColumnChannelDataSet} from "../../../service/column";
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
    loadColumnChannelDataSet({rows: 1000, status: 1}).then(data => {
      this.setState({channelList: data.data.dataSet.rows})
    }).catch((e) => {
      message.error(e);
    })
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      freePay: formData.freePay ? 0 : 1,
      content: UE.getEditor("new_columnItemIntroduction").getContent(),
      coverUrl: formData.coverUrl ? formData.coverUrl[0].response.data.image : '',
      thumbnailUrl: formData.thumbnailUrl ? formData.thumbnailUrl[0].response.data.image : '',
      price: formData.price * 100,
      priceVIP: formData.priceVIP * 100,
      status: 1
    };

    createColumnChannelItem(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };

    return (
      <div>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                initialValue: '',
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
                initialValue: '',
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
            <FormItem{...formItemLayout} label="期数">
              {getFieldDecorator('itemOrder',
                {
                  initialValue: 0,
                }
              )(

                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="new_columnItemIntroduction"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="免费">
              {getFieldDecorator('freePay', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="普通价格">
              {getFieldDecorator('price', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="会员价格">
              {getFieldDecorator('priceVIP', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{span: 12, offset: 4}}>
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(New);
