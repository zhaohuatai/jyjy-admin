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

class New extends Component {

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
  handleSubmit = (e) => {
    let formData = this.props.form.getFieldsValue();

    formData = {
      ...formData,
      introduction: UE.getEditor('update_serviceEntrance').getContent(),
      isTop: formData.isTop ? 1 : 0,
    };

    if (this.state.cate) {
      formData[`cate${this.state.cate}Id`] = this.state.cateValue;
    }

    if (Object.prototype.toString.call(formData.coverUrl) === '[object Array]') {
      formData.coverUrl = formData.coverUrl[0].response.data.image;
    }

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

  componentDidMount() {
    let form = this.props.form;
    loadEntranceCategoryFDataSet({rows: 1000}).then(data => {
      if (this.props.data.cateFirstId) {
        this.setState({cate: 'First', cateValue: this.props.data.cateFirstId})
        form.setFieldsValue({
          cateId: this.props.data.cateFirstId,
        })
      }
      if (data.data.dataSet.total) {
        this.setState({options: this.renderData(data.data.dataSet.rows, 'First')}, () => {
          //这里有瑕疵
          this.state.options.map((cateFirst) => {
            loadEntranceCategorySDataSet({rows: 1000, cateFirstId: cateFirst.value}).then(data => {
              if (data.data.dataSet.total) {
                cateFirst.children = this.renderData(data.data.dataSet.rows, 'Second').map((cateSecond) => {
                  console.log(cateSecond);
                  if (this.props.data.cateSecondId && this.props.data.cateSecondId === cateSecond.value) {
                    this.setState({cate: 'Second', cateValue: this.props.data.cateSecondId})
                    form.setFieldsValue({
                      cateId: `${cateFirst.value},${cateSecond.value}`,
                    })
                  }
                  loadEntranceCategoryTDataSet({rows: 1000, cateSecondId: cateSecond.value}).then(data => {
                    if (data.data.dataSet.total) {
                      cateSecond.children = this.renderData(data.data.dataSet.rows, 'Third').map((cateThird) => {
                        console.log(cateThird);
                        if (this.props.data.cateThirdId && this.props.data.cateThirdId === cateThird.value) {
                          this.setState({cate: 'Third', cateValue: this.props.data.cateThirdId})
                          form.setFieldsValue({
                            cateId: `${cateFirst.value},${cateSecond.value},${cateThird.value}`,
                          })
                        }
                      })
                    } else {
                      cateSecond.isLeaf = true;
                    }
                  })
                })
              } else {
                cateFirst.isLeaf = true;
              }
            })
          })
        });

      }
    }).then(() => {
      console.log(this.state.options);
      this.setState({options: [...this.state.options]});
    }).catch((e) => {
        message.error(e);
      }
    );
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      title, remark, freePay, isTop, showIndex, introduction, price, priceVIP, cateFirstId, cateSecondId, cateThirdId
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

export default Form.create()(New);
