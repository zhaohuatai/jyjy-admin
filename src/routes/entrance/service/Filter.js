import React, {Component} from 'react';
import {Button, Cascader, Col, Dropdown, Form, Icon, Input, Menu, message, Row} from 'antd';
import {loadEntranceCategoryFDataSet, loadEntranceCategorySDataSet} from "../../../service/entrance";

const FormItem = Form.Item;

class Filter extends Component {

  renderData = (data, cate) => {
    if (!data) return;
    let options = [];
    data.forEach((row) => {
      options.push({value: `${row['id']}`, label: row['name'], isLeaf: false, cate: 'First'})
    });
    return options;
  }
  loadCateData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    switch (targetOption.cate) {
      case 'First' :
        loadEntranceCategorySDataSet({rows: 1000, cateFirstId: targetOption.value}).then(data => {

          if (data.data.dataSet.rows) {
            this.props.form.setFieldsValue({
              cateSecondId: data.data.dataSet.rows[0]['id'] + '',
            });
            this.handleActionClick({key: 'search'});
          }
        });
        break;

    }
    // loadEntranceCategorySDataSet({rows: 1000}).then(data => {
    //   this.setState({cateBList: data.data.dataSet.rows});
    //   if (data.data.dataSet.rows) {
    //     this.props.form.setFieldsValue({
    //       cateSecondId: data.data.dataSet.rows[0]['id'] + '',
    //     });
    //     this.handleActionClick({key: 'search'});
    //   }
    // }).then(
    //   loadEntranceCategoryTDataSet({rows: 1000}).then(data => {
    //     this.setState({cateCList: data.data.dataSet.rows});
    //     if (data.data.dataSet.rows) {
    //       this.props.form.setFieldsValue({
    //         cateThirdId: data.data.dataSet.rows[0]['id'] + '',
    //       });
    //       this.handleActionClick({key: 'search'});
    //     }
    //   }))
  }
  onCateChange = (selectedOptions) => {
    // console.log(selectedOptions);
  }

  constructor(props) {
    super(props);
    this.state = {
      search_form: {},
      options: [],
    };
  }

  componentDidMount() {
    loadEntranceCategoryFDataSet({rows: 1000}).then(data => {
      if (data.data.dataSet.rows) {
        this.setState({options: this.renderData(data.data.dataSet.rows)});
        this.props.form.setFieldsValue({
          cateId: data.data.dataSet.rows[0]['id'] + '',
        });
        this.handleActionClick({key: 'search'});
      }
    }).catch((e) => {
        message.error(e);
      }
    )
  }

  handleActionClick = ({item, key, keyPath}) => {
    switch (key) {
      case 'clean' :
        this.props.form.resetFields();
        break;
      case 'search' :
        this.props.doSearch(this.props.form.getFieldsValue());
        break;
      case 'refresh' :
        this.props.doRefresh();
        break;
      case 'delete' :
        this.props.doDelete();
        break;
      case 'update' :
        this.props.doUpdate();
        break;
      case 'recycle' :
        this.setState({recycleStr: !this.state.recycleStr});
        this.props.doRecycle();
        break;
      default :
        break;
    }
  }

  doSearch = () => {
    let form = this.state;
    this.props.doSearch(form);
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const menu = (
      <Menu disabled={this.props.recycle} onClick={this.handleActionClick}>
        <Menu.Item key="delete">删除</Menu.Item>
        <Menu.Item key="update">更新</Menu.Item>
      </Menu>
    );

    const searchMenu = (
      <Menu onClick={this.handleActionClick}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="clean">清空</Menu.Item>
      </Menu>
    )

    return (
      <div>
        <Row type='flex' justify='end' style={{marginBottom: '5px'}}>
          <Col span={4} pull={10}>
            <FormItem>
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input size='default' addonBefore='服务' onPressEnter={() => this.handleActionClick({key: 'search'})}/>
              )}
            </FormItem>
          </Col>

          <Col span={4} pull={9}>
            <FormItem>
              {getFieldDecorator('cateId')(
                <Cascader size='default' placeholder="栏目" options={this.state.options} loadData={this.loadCateData}
                          onChange={this.onCateChange} changeOnSelect/>
              )}
            </FormItem>
          </Col>

          <Col span={2}>
            <Dropdown.Button onClick={() => this.handleActionClick({key: 'search'})} overlay={searchMenu}>
              搜索
            </Dropdown.Button>
          </Col>

          <Col span={2}>
            <Dropdown overlay={menu}>
              <Button>
                操作 <Icon type="down"/>
              </Button>
            </Dropdown>
          </Col>

          <Col span={2}>
            <Button onClick={() => {
              this.handleActionClick({key: 'recycle'});
            }
            }>
              <Icon type="info-circle-o"/> {this.props.recycle ? "返回" : "回收站"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Filter);
