import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Row, Select, Switch, Upload} from 'antd';
import {loadMemberTeacherDataSet} from "../../../service/member";
import {createColumnChannelItem, loadColumnChannelDataSet} from "../../../service/column";
import UEditor from "../../../components/editor/UEditor";
import LazyLoad from 'react-lazy-load';
import {API_DOMAIN} from "../../../config";

const FormItem = Form.Item;

class New extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channelList: [],
      presenterList: []
    }
  }

  componentDidMount() {
    loadColumnChannelDataSet({rows: 1000}).then(data => {
      this.setState({channelList: data.data.dataSet.rows})
    });

    loadMemberTeacherDataSet({rows: 1000}).then(data => {
      this.setState({presenterList: data.data.dataSet.rows})
    })
  }

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      freePay: formData.freePay ? 0 : 1,
      content: UE.getEditor("new_columnItemIntroduction").getContent(),
    };

    if (formData.coverUrl) {
      formData.coverUrl = formData.coverUrl[0].response.data.image;
    }

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
              {getFieldDecorator('itemOrder')(
                <Input type="number"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="内容">
              <LazyLoad height={370}>
                <UEditor id="new_columnItemIntroduction"
                         uploadAPI={`${API_DOMAIN}admin/channel/columnChannelItem/uploadAttachment`}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="主讲人">
              {getFieldDecorator('presenterId', {
                rules: [
                  {required: true, message: '请选择'},
                ]
              })(
                <Select placeholder="选择主讲人" style={{width: '200px'}}>{
                  this.state.presenterList.map(item => {
                    return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                  })
                }
                </Select>
              )}
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
