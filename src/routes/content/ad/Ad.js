import React, { Component } from 'react';
import NewAd from './NewAd';
import { Button,Table,Pagination,message } from 'antd';
import {addProductAdv,loadProductAdvDataSet,uploadProductAdvImage,deleteProductAdv,setProductAdvIsShow,loadProductDetail} from '../../../http';
import style from '../content.scss';
import Filter from './Filter';
import Item from './Item';

class Ad extends Component {
  state = {
    visible: false,
    selectedRowKeys: [],  // Check here to configure the default column
    loading: false,
    item_visible:false,
    itemadd_visable:false,
    item_data:{
      productinfo:{
        "age":"",
				"author":"",
				"brandId":"",
        "productName":'',
    }},
    dataSource:[],
    currentPage:1,
    total:0
  };

  componentDidMount(){
    loadProductAdvDataSet({},data=>{
      this.setState({dataSource:data.data.dataSet.rows});
    });
  }

  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    this.setState({visible:false})
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleRefresh=(currentPage)=>{
    this.setState({loading:true,selectedRowKeys:[]});
    loadProductAdvDataSet({page:currentPage},data=>{
      this.setState({dataSource:data.data.dataSet.rows,loading:false});
    });
  }

  handleAction=(key)=>{
    switch (key) {
      case 'delete':
        deleteProductAdv({id:this.state.selectedRowKeys[0]},data=>{
          message.success(data.message);
          this.handleRefresh(this.state.currentPage);
        })
        break;
      case 'isshow':
        setProductAdvIsShow({id:this.state.selectedRowKeys[0],isShow:1},data=>{
          message.success(data.message);
          this.handleRefresh(this.state.currentPage);
        })
        break;
      case 'notshow':
        setProductAdvIsShow({id:this.state.selectedRowKeys[0],isShow:0},data=>{
          message.success(data.message);
          this.handleRefresh(this.state.currentPage);
        })
        break;
      default:
    }
  }

  uploadAdImageSuccess=()=>{
    this.handleRefresh(this.state.currentPage);
    this.setState({item_visible:false});
  }

  //切换页码
	onChangePage=(currentPage)=>{
			this.handleRefresh(currentPage);
	}

  onRowClick=(record, index, event)=>{
    loadProductDetail({id:record.productId},data=>{
      record.productinfo = data.data.productDetailResDto.product;
      this.setState({item_data:record,item_visible:true});
    })
  }

  render() {
    const columns = [
      {title:'id',dataIndex:'id',key:'id'},
      {title: '商品id',dataIndex: 'productId',key:'productId'},
      {title: '是否显示',dataIndex: 'isShow',key:'isShow',
        render: (text, record, index) => {
          switch (text) {
            case '0':
              return '否';
            case '1':
              return '是';
            default:
              break;
          }
        }
      },
      {title: '状态',dataIndex: 'status',key:'status',
        render: (text, record, index) => {
          switch (text) {
            case '0':
              return '禁用';
            case '1':
              return '正常';
            case '2':
              return '删除';
            default:
              break;
          }
        }
      },
      {title: '图片',dataIndex: 'image',key:'image'},
      {title: '修改时间',dataIndex: 'updateTime',key:'updateTime'},
      {title: '创建时间',dataIndex: 'creatTime',key:'creatTime'}
    ];

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div >
        <Filter
          action={this.handleAction}
          doRefresh={()=>this.handleRefresh(this.state.currentPage)}
          doAdd={()=>this.setState({itemadd_visable:true})}
          />
        <Table
          columns={columns}
          dataSource={this.state.dataSource}
          bordered
          size='middle'
          loading={loading}
          rowSelection={rowSelection}
          rowKey={record => record.id}
          className={style.table}
          onRowClick={this.onRowClick}
          pagination={false}
        />
        <Pagination className={style.pagination} showQuickJumper defaultCurrent={1} current={this.state.currentPage} defaultPageSize={50} total={this.state.total} onChange={this.onChangePage} />

        <NewAd
          ref={this.saveFormRef}
          visible={this.state.itemadd_visable}
          onCancel={()=>{this.setState({itemadd_visable:false})}}
          onOk={()=>{this.setState({itemadd_visable:false});this.handleRefresh(this.state.currentPage)}}
        />
      <Item visible={this.state.item_visible} onCancel={()=>this.setState({item_visible:false})} onOk={this.uploadAdImageSuccess} data={this.state.item_data}/>
      </div>
    );
  }
}

export default Ad;
