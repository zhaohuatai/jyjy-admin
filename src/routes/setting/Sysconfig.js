import React, {Component} from 'react';
import style from './setting.scss';
import {loadDicSysconfig, loadDicSysconfigDataSet, updateDicSysconfig} from '../../service/auth';
import {message, RangePicker, Table, Tabs} from 'antd';
import SysconfigFilter from './SysconfigFilter';
import SysconifgUpdate from './SysconifgUpdate';

const TabPane = Tabs.TabPane;

class Sysconfig extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys: [],
			loading: true,
			dataSource:[],
			pageRows:100,
			total:0,
			currentPage:1,
			visible_update:false,
			cur_config_update_data:{
				confName:'',
				confCode:'',
				confValue:''
			}
    };
	}

  handleUpdateSysconfig = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      updateDicSysconfig(values, data => {
        if (data.statusCode == 200) {
          message.success('操作成功');
          this.setState({visible_update: false});
          this.handleRefresh();
        }
      })

      form.resetFields();
      this.setState({visible: false});
    });
	}

	//选择列
	onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

	//操作
  handleActionClick=({item, key})=>{
		console.log(item,key);
	}

  //刷新列表
  handleRefresh=()=>{
		this.setState({loading:true});

		loadDicSysconfigDataSet({
			rows:this.state.pageRows,
			page:this.state.currentPage
		},data=>{
			this.setState({
				dataSource:data.data.dataSet.rows,
				loading:false,
				total:data.data.dataSet.total
			});
    })
	}

  //操作
	handleOperation = (key)=>{
		let id = this.state.selectedRowKeys[0];
		switch (key) {
			case 'delete':
				deleteCategory({id:id},data=>{
					if(data.statusCode ==200){
						message.success('操作成功');
					}
				})
			break;
			case 'update':
				this.setState({visible_update:true});
				loadDicSysconfig({id:id},data=>{
					this.setState({
						cur_config_update_data:data.data.dicSysconfig
					})
				})
				break;
		break;
			default:
				break;
		}
	}

  componentDidMount() {
    this.handleRefresh();
	}

	saveUpdateFormRef = (form) => {
    this.form = form;
  }

  render() {
    const { loading, selectedRowKeys } = this.state;

    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
      { title: '名称',  dataIndex: 'confName', key: 'confName' },
      { title: '值',  dataIndex: 'confValue', key: 'confValue' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', },
      { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime',  },
      { title: '配置码', dataIndex: 'confCode', key: 'confCode',  },
			{ title: '状态', dataIndex: 'status', key: 'status',
				render: (text, record, index) => {
					switch (text) {
						case '1':
							return '正常';
						case '2':
							return '删除';
						case '0':
						  return '禁用';
						default:
							break;
					}
				}
		  }];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={style.orderroot}>
				<SysconfigFilter operation={this.handleOperation}/>

        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          bordered
          size='middle'
					loading={this.state.loading}
          rowSelection={rowSelection}
					rowKey={record => record.id}
					pagination={false}
        />

				<SysconifgUpdate
          ref={this.saveUpdateFormRef}
          visible={this.state.visible_update}
          onCancel={()=>this.setState({visible_update:false})}
          onCreate={this.handleUpdateSysconfig}
          formData={this.state.cur_config_update_data}
				/>
      </div>
    );
  }
}

export default Sysconfig;
