import React, {Component} from 'react';
import {Button, Cascader, Col, Dropdown, Form, Icon, Input, Menu, message, Row} from 'antd';
import {
  loadEntranceCategoryFDataSet,
  loadEntranceCategorySDataSet,
  loadEntranceCategoryTDataSet
} from "../../../service/entrance";

const FormItem = Form.Item;

class Filter extends Component {

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

  onCateChange = (value, selectedOptions) => {
    this.handleActionClick({
      key: 'search',
      cate: selectedOptions[selectedOptions.length - 1].cate,
      value: selectedOptions[selectedOptions.length - 1].value
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      search_form: {},
      options: [],
    };
  }

  handleActionClick = ({key, cate, value}) => {
    switch (key) {
      case 'clean' :
        this.props.form.resetFields();
        break;
      case 'search' :
        let params = this.props.form.getFieldsValue();
        if (cate) {
          params[`cate${cate}Id`] = value;
        }
        this.props.doSearch(params);
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

  componentDidMount() {
    loadEntranceCategoryFDataSet({rows: 1000}).then(data => {
      if (data.data.dataSet.rows) {
        this.setState({options: this.renderData(data.data.dataSet.rows, 'First')});
        this.handleActionClick({key: 'search'})
      }
    }).catch((e) => {
        message.error(e);
      }
    )
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
          <Col span={4} pull={8}>
            <FormItem>
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input size='default' addonBefore='服务' onPressEnter={() => this.handleActionClick({key: 'search'})}/>
              )}
            </FormItem>
          </Col>

          <Col span={6} pull={1}>
            <FormItem>
              <Cascader size='default' placeholder="栏目" options={this.state.options} loadData={this.loadCateData}
                        style={{width: 270}}
                        onChange={this.onCateChange} changeOnSelect/>
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
