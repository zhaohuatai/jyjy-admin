import React, { Component } from 'react';
import New from './New';
import { Button,Table } from 'antd';
import {loadPubTermDataSet,deletePubTerm,loadPubTerm} from '../../../http';
import Filter from './Filter';
import Item from './Item';
import Edit from './Edit';

class Term extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
      dataSource:[],
      visible: false,
      currentPage:1,
      item_visible:false,
      item_data:{},
      itemedit_visible:false,
      itemedit_data:{}
    };
  }

  componentDidMount(){
    this.handleRefresh(this.state.currentPage);
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreateSuccess = ()=>{
    this.setState({visible:false});
  }

  handleRefresh=(currentPage)=>{
    this.setState({loading:true,selectedRowKeys:[]});
    loadPubTermDataSet({page:currentPage},data=>{
      this.setState({dataSource:data.data.dataSet.rows,loading:false});
    });
  }

  uploadArticleSuccess=()=>{
    this.setState({item_visible:false});
    this.handleRefresh();
  }

  editSuccess=()=>{
    this.setState({itemedit_visible:false});
    this.handleRefresh();
  }

  handleAction=(key)=>{
    switch (key) {
      case 'delete':
        deletePubTerm({id:this.state.selectedRowKeys[0]},data=>{
          message.success(data.message);
          this.handleRefresh(this.state.currentPage);
        })
        break;
      case 'edit':
        if(this.state.selectedRowKeys[0]){
          loadPubTerm({id:this.state.selectedRowKeys[0]},data=>{
            if(data.statusCode==200){
              this.setState({itemedit_data:data.data.pubTerm,itemedit_visible:true})
            }
          })
        }
        break;
      default: break;
    }
  }

  onRowClick=(record, index, event)=>{
    this.setState({item_data:record,item_visible:true});
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [
      {title:'id',dataIndex:'id',key:'id'},
      {title:'标题',dataIndex:'title',key:'title'},
      {title: '内容',dataIndex: 'thumbnailImagePath',key:'thumbnailImagePath',render:()=>{return('点击查看')}},
      {title: '修改时间',dataIndex: 'edittime',key:'edittime'},
      {title: '发布时间',dataIndex: 'addtime',key:'addtime'},
      {title: '状态',dataIndex: 'status',key:'status',render: (text, record, index) => {
        switch (text) {
          case '1':
            return '正常';
          case '0':
            return '删除';
          default:
            break;
        }
      }}
    ];
    return (
      <div >
        <Filter action={this.handleAction} doRefresh={()=>this.handleRefresh(this.state.currentPage)} doAdd={()=>this.setState({visible:true})}/>

        <Table
          columns={columns}
          dataSource={this.state.dataSource}
          bordered
          size='middle'
          loading={loading}
          rowSelection={rowSelection}
          rowKey={record => record.id}
          onRowClick={this.onRowClick}
        />

        <New
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onOk={this.handleCreateSuccess}
        />

        <Item visible={this.state.item_visible} onCancel={()=>this.setState({item_visible:false})} onOk={this.uploadArticleSuccess} data={this.state.item_data}/>
        <Edit visible={this.state.itemedit_visible} onCancel={()=>this.setState({itemedit_visible:false})} onOk={this.editSuccess} data={this.state.itemedit_data}/>
      </div>
    );
  }
}

export default Term;
