import React, {Component} from 'react';
import {API_DOMAIN} from '../../../utils/config';
import {Button, Cascader, Col, Form, Icon, Input, message, Modal, Row, Switch, Upload} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import LazyLoad from 'react-lazy-load';
import {
  loadEntranceCategoryFDataSet,
  loadEntranceCategorySDataSet,
  loadEntranceCategoryTDataSet,
  updateServiceEntrance
} from "../../../service/entrance";

const FormItem = Form.Item;

class Update extends Component {

  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData = {
      ...this.props.data,
      ...formData,
      introduction: UE.getEditor('update_serviceEntrance').getContent(),
      isTop: formData.isTop ? 1 : 0,
      coverUrl: formData.coverUrl ? formData.coverUrl[0].response.data.image : this.props.data.coverUrl,
    };

    if (this.state.cate) {
      formData[`cate${this.state.cate}Id`] = this.state.cateValue;
    }

    console.log(formData);

    updateServiceEntrance(formData).then(data => {
      this.props.form.resetFields();
      this.props.onCancel();
      message.success("更新成功！");
    }).catch((e) => {
      message.error(e);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      cate: [],
      cateValue: [],
    }
  }

  onCateChange = (value, selectedOptions) => {
    this.setState({
      cate: selectedOptions[selectedOptions.length - 1].cate,
      cateValue: selectedOptions[selectedOptions.length - 1].value
    })
  };

  componentDidMount() {
    loadEntranceCategoryFDataSet({rows: 1000}).then(data => {
      if (data.data.dataSet.rows) {
        this.setState({options: this.renderData(data.data.dataSet.rows, 'First')});
      }
    }).catch((e) => {
        message.error(e);
      }
    )
  }

  renderData = (data, cate) => {
    if (!data) return;
    let options = [];
    data.forEach((row) => {
      let isLeaf = false;
      switch (cate) {
        case 'First' :
          loadEntranceCategorySDataSet({rows: 1, cateFirstId: row['id']}).then(d => {
            if (!d.data.dataSet.total)
              isLeaf = true;
            options.push({value: `${row['id']}`, label: row['name'], isLeaf: isLeaf, cate})
          });
          break;
        case 'Second' :
          loadEntranceCategoryTDataSet({rows: 1, cateSecondId: row['id']}).then(d => {
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
        loadEntranceCategorySDataSet({rows: 1000, cateFirstId: targetOption.value}).then(data => {
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
        loadEntranceCategoryTDataSet({rows: 1000, cateSecondId: targetOption.value}).then(data => {
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

  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      title, remark, isTop, showIndex, introduction, cateName,
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
    };

    return (
      <Modal title="更新服务" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
        <Row type='flex' style={{marginBottom: '5px'}}>
          <Col span={24}>
            <FormItem{...formItemLayout} label="服务名">
              {getFieldDecorator('title', {
                initialValue: title,
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
                  action={`${API_DOMAIN}admin/service/entrance/uploadCover`}
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
                ],
              })(
                <div>
                  <span>{cateName}  </span>
                  <Cascader placeholder="选择新栏目" options={this.state.options} loadData={this.loadCateData}
                            style={{width: 270}} onChange={this.onCateChange} changeOnSelect/>
                </div>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="图文简介">
              <LazyLoad height={370}>
                <UEditor id="update_serviceEntrance" initValue={introduction}/>
              </LazyLoad>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否置顶">
              {getFieldDecorator('isTop', {
                valuePropName: 'checked',
                initialValue: !!isTop,
              })(
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="显示顺序">
              {getFieldDecorator('showIndex', {
                initialValue: showIndex,
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem{...formItemLayout} label="备注">
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

export default Form.create()(Update);
