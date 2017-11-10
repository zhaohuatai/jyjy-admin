import React, { Component } from 'react';
import NewPost from './NewPost';
import { Button,Table } from 'antd';
import {loadPubArticleImageDataSet,deletePubArticleImage} from '../../../http';
import Filter from './Filter';
import Item from './Item';

class Post extends Component {
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
    loadPubArticleImageDataSet({page:currentPage},data=>{
      this.setState({dataSource:data.data.dataSet.rows,loading:false});
    });
  }

  uploadArticleSuccess=()=>{
    this.setState({item_visible:false});
    this.handleRefresh();
  }

  handleAction=(key)=>{
    switch (key) {
      case 'delete':
        deletePubArticleImage({id:this.state.selectedRowKeys[0]},data=>{
          message.success(data.message);
          this.handleRefresh(this.state.currentPage);
        })
        break;
      default:
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
      {title: '缩略图',dataIndex: 'thumbnailImagePath',key:'thumbnailImagePath'},
      {title: '主图',dataIndex: 'mainImagePath',key:'mainImagePath'},
      {title: '修改时间',dataIndex: 'updateTime',key:'updateTime'},
      {title: '发布时间',dataIndex: 'createTime',key:'createTime'},
      {title: '排序',dataIndex: 'showIndex',key:'showIndex'}
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

        <NewPost
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onOk={this.handleCreateSuccess}
        />

      <Item visible={this.state.item_visible} onCancel={()=>this.setState({item_visible:false})} onOk={this.uploadArticleSuccess} data={this.state.item_data}/>
      </div>
    );
  }
}

export default Post;
