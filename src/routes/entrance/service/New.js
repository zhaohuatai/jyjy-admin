import React, {Component} from 'react';
import {API_DOMAIN} from '../../../utils/config';
import {Button, Cascader, Col, Form, Icon, Input, message, Row, Upload, InputNumber, Switch} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import LazyLoad from 'react-lazy-load';
import {
  createServiceEntrance,
  loadEntranceCategoryFDataSet,
  loadEntranceCategorySDataSet,
  loadEntranceCategoryTDataSet
} from "../../../service/entrance";

const FormItem = Form.Item;

class New extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();
    formData = {
      ...formData,
      introduction: UE.getEditor('new_serviceEntrance').getContent(),
      isTop: formData.isTop ? 1 : 0,
      coverUrl: formData.coverUrl ? formData.coverUrl[0].response.data.image : '',
      thumbnailUrl: formData.thumbnailUrl ? formData.thumbnailUrl[0].response.data.image : '',
    };

    if (this.state.cate) {
      formData[`cate${this.state.cate}Id`] = this.state.cateValue;
    }

    createServiceEntrance(formData).then(data => {
      this.props.form.resetFields();
      message.success("创建成功！");
    }).catch((e) => {
      message.error(e);
    })
  }
  onCateChange = (value, selectedOptions) => {
    this.setState({
      cate: selectedOptions[selectedOptions.length - 1].cate,
      cateValue: selectedOptions[selectedOptions.length - 1].value
    })
  };

  renderData = (data, cate) => {
    if (!data) return;
    let options = [];
    data.forEach((row) => {
      let isLeaf = false;
      switch (cate) {
        case 'First' :
          loadEntranceCategorySDataSet({rows: 1, cateFirstId: row['id'], status: 1}).then(d => {
            if (!d.data.dataSet.total)
              isLeaf = true;
            options.push({value: `${row['id']}`, label: row['name'], isLeaf: isLeaf, cate})
          });
          break;
        case 'Second' :
          loadEntranceCategoryTDataSet({rows: 1, cateSecondId: row['id'], status: 1}).then(d => {
            if (!d.data.dataSet.total)
              isLeaf = true;
            options.push({value: `${row['id']}`, label: row['name'], isLeaf: isLeaf, cate})
          });
          break;
        case 'Third' :
          options.push({value: `${row['id']}`, label: row['name'], isLeaf: true, cate})
      }
    });
    return options;
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  }

  loadCateData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    switch (targetOption.cate) {
      case 'First' :
        loadEntranceCategorySDataSet({rows: 1000, cateFirstId: targetOption.value,  status: 1}).then(data => {
          if (data.data.dataSet.total) {
            targetOption.children = this.renderData(data.data.dataSet.rows, 'Second');
          } else {
            targetOption.isLeaf = true;
          }
        }).then(() => {
          setTimeout(() => {
            targetOption.loading = false;
            this.setState({options: [...this.state.options]});
          }, 500)
        });
        break;
      case 'Second' :
        loadEntranceCategoryTDataSet({rows: 1000, cateSecondId: targetOption.value,  status: 1}).then(data => {
          if (data.data.dataSet.total) {
            targetOption.children = this.renderData(data.data.dataSet.rows, 'Third');
          } else {
            targetOption.isLeaf = true;
          }
        }).then(() => {
          setTimeout(() => {
            targetOption.loading = false;
            this.setState({options: [...this.state.options]});
          }, 500)
        });
        break;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      cate: [],
      cateValue: [],
    }
  }

  componentDidMount() {
    loadEntranceCategoryFDataSet({rows: 1000, status: 1}).then(data => {
      if (data.data.dataSet.rows) {
        this.setState({options: this.renderData(data.data.dataSet.rows, 'First')});
      }
    }).catch((e) => {
        message.error(e);
      }
    )
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
            <FormItem{...formItemLayout} label="服务名">
              {getFieldDecorator('title', {
                initialValue: '',
                rules: [
                  {required: true, message: '请输入'},
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="封面">
              {getFieldDecorator('coverUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action={`${API_DOMAIN}admin/entrance/uploadCover`}
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
                  action={`${API_DOMAIN}admin/entrance/uploadThumbnail`}
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
            <FormItem{...formItemLayout} label="栏目">
              {getFieldDecorator('cateId', {
                rules: [
                  {required: true, message: '请选择'},
                ]
              })(
                <Cascader placeholder="选择栏目" options={this.state.options} loadData={this.loadCateData}
                          style={{width: 270}} onChange={this.onCateChange} changeOnSelect/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="图文简介">
              <LazyLoad height={370}>
                <UEditor id="new_serviceEntrance"/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="最大可预约数">
              {getFieldDecorator('maxAppointCount', {
                initialValue: 0,
                rules: []
              })(
                <InputNumber/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="前台显示可预约数">
              {getFieldDecorator('appointCount', {
                initialValue: 0,
                rules: []
              })(
                <InputNumber/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="置顶">
              {getFieldDecorator('isTop', {
                valuePropName: 'checked',
                initialValue: false,
                rules: []
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('showIndex', {
                initialValue: '',
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
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