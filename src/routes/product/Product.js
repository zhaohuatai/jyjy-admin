import React, { Component } from 'react';
import style from './product.scss';
import { message, Tabs , Table, Button, Dropdown, Menu, Pagination, Input, Col, Row, RangePicker, Icon,notification} from 'antd';
import {loadProduct,checkProduct,setProductIsHot,loadMember,setProductOffShelf} from '../../service/auth';
import ProductFilter from './ProductFilter';
import ProductItem from './ProductItem';

class Product extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys: [],
			loading: true,
			dataSource:[],
			pageRows:50,
			total:0,
			currentPage:1,
      item_visible:false,
      item_data:{
        seller:{
          name:'',
          nickName:''
        }
      },
			searchform:{
				productStatusList:'',
				productTimeStart:'',
				productTimeEnd:'',
				buyerId:'',
				shopId:'',
				rows:50,
				page:1,
				isHot:'',
        deliveryType:''
			},
      intervalId:null,
      waitup_count:0,
    };
	}

  componentDidMount(){
    this.handleRefresh({status: '1'});
    let intervalId = setInterval(this.handleRefresh,600000);
    this.setState({intervalId: intervalId});
	}

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

	//选择列
	onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

	//切换页码
	onChangePage=(currentPage)=>{

			let searchform = this.state.search_form;

			searchform.rows = this.state.pageRows;
			searchform.page = currentPage;

			loadProduct(searchform, data=>{
				this.setState({
					dataSource:data.data.dataSet.rows,
					loading:false,
          total:data.data.dataSet.total,
          currentPage
				});
			})
	}

  //确认收货
  handleSingled=(id)=>{
		confirmReceipt({id:id},data=>{
			if(data.statusCode==200){
				message.success('操作成功');
			}else{
				message.error('操作失败');
			}
		})
  }



  //刷新列表
  handleRefresh=()=>{
    this.setState({loading:true,selectedRowKeys:[]});

    this.setState({currentPage:1},()=>{
      let params = this.state.search_form;
      loadProduct(params, data=>{
        let waitup_count = 0;
        data.data.dataSet.rows.map(item=>{
          if(item.productStatus=='4') waitup_count++;
        })

        this.setState({
          dataSource:data.data.dataSet.rows,
          loading:false,
          total:data.data.dataSet.total,
          waitup_count
        });

        notification.warning({
            message: '审核提醒',
            description: `当前存在  ${this.state.waitup_count}  件申请上架商品`,
            duration:600,
          });
      })
    });


    // window.setInterval(()=>{
    //   this.setState({loading:true,selectedRowKeys:[]});
    //
  	// 	this.setState({currentPage:1},()=>{
  	// 		let params = this.state.search_form;
  	// 		loadProduct(params, data=>{
  	// 			this.setState({
  	// 				dataSource:data.data.dataSet.rows,
  	// 				loading:false,
  	// 				total:data.data.dataSet.total
  	// 			});
  	// 		})
  	// 	});
    // },20000)
	}

	//清空form
	doCleanForm=()=>{
		console.log('doclean');
	}

	//搜索
	doSearch=(searchform)=>{
		searchform.rows = this.state.pageRows;
		searchform.page = 1;

		this.setState({currentPage:1, search_form:searchform});

		console.log(searchform);

		loadProduct(searchform,data=>{
			this.setState({
				dataSource:data.data.dataSet.rows,
				loading:false,
				total:data.data.dataSet.total,
			});
    })
	}

	//设置商品状态
	handleProductStatus=(status)=>{
		setProductStatus({
			productId:this.state.selectedRowKeys[0],
			status:status
		},data=>{
			if(data.statusCode==200){
				message.success('操作成功');
				this.handleRefresh({status: '1'});
			}else{
				message.error('操作失败');
			}
		})
	}

  RowClick=(record, index, event)=>{
    loadMember({id:record.sellerId},data=>{
      let item_data = this.state.dataSource[index];
      item_data.seller = data.data.member;
      this.setState({item_visible:true,item_data});
    })
  }

	//操作
	handleAction=(key)=>{
		console.log(key);
		switch (key) {
			case 'ishot':
			  setProductIsHot({isHot:1,productId:this.state.selectedRowKeys[0]},data=>{
					if(data.statusCode==200){
						message.success('操作成功');
						this.handleRefresh({status: '1'});
					}else{
						message.error('操作失败');
					}
				});
				break;
			case 'nothot':
				setProductIsHot({isHot:0,productId:this.state.selectedRowKeys[0]},data=>{
					if(data.statusCode==200){
						message.success('操作成功');
						this.handleRefresh({status: '1'});
					}else{
						message.error('操作失败');
					}
				});
				break;
			case 'checksuccess':
			  checkProduct({productId:this.state.selectedRowKeys[0],status:6},data=>{
					if(data.statusCode==200){
						message.success('操作成功');
						this.handleRefresh({status: '1'});
					}else{
						message.error('操作失败');
					}
				});
				break;
			case 'checkfail':
			  checkProduct({productId:this.state.selectedRowKeys[0],status:5},data=>{
					if(data.statusCode==200){
						message.success('操作成功');
						this.handleRefresh({status: '1'});
					}else{
						message.error('操作失败');
					}
				});
				break;
			case 'offshelf':
			  setProductOffShelf({productId:this.state.selectedRowKeys[0]},data=>{
					if(data.statusCode==200){
						message.success('操作成功');
						this.handleRefresh({status: '1'});
					}else{
						message.error('操作失败');
					}
				});
				break;
			default:
				break;
		}
	}

  render() {
		const { loading, selectedRowKeys } = this.state;

    const columns = [
      { title: 'id',  dataIndex: 'id', key: 'id' },
			{ title: '状态',  dataIndex: 'productStatus', key: 'productStatus' ,
				render: (text, record, index) => {
					switch (text) {
						case '1':
							return '在售';
						case '2':
						  return '已删除';
						case '3':
						return '已下架';
						case '4':
						return '申请上架';
						case '5':
						return '拒绝上架';
						case '6':
						return '待保证';
						case '7':
						return '已售出';
						default:
							break;
					}
				}
		  },
			{ title: '名称',  dataIndex: 'productName', key: 'ordersn' },
      { title: '作者', dataIndex: 'author', key: 'author', },
      { title: '年代', dataIndex: 'age', key: 'age',  },
      { title: '市场价', dataIndex: 'marketPrice', key: 'marketPrice',  },
      { title: '售价', dataIndex: 'sellPrice', key: 'sellPrice', },
      { title: '发布者', dataIndex: 'shopId', key: 'shopId',  },
      { title: '交货方式', dataIndex: 'deliveryType', key: 'deliveryType', render: (text, record, index)=>text == '1' ? '快递' : '面交' },
      { title: '发布时间', dataIndex: 'creatTime', key: 'creatTime',  },
      { title: '收藏数', dataIndex: 'favoriteCount', key: 'favoriteCount',  },
			{ title: '点击量', dataIndex: 'visitCount', key: 'visitCount',  },
			{ title: '热门', dataIndex: 'isHot', key: 'isHot', render: (text, record, index)=>text == '1' ? '是' : '' },
      ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={style.orderroot}>

			  <ProductFilter doSearch={this.doSearch} cleanform={this.doCleanForm} setProductStatus={this.handleProductStatus} action={this.handleAction}/>

        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          bordered
          size='middle'
					loading={this.state.loading}
          rowSelection={rowSelection}
					rowKey={record => record.id}
					pagination={false}
          onRowClick={this.RowClick}
        />
				<Pagination className={style.pagination} showQuickJumper defaultCurrent={1} current={this.state.currentPage} defaultPageSize={50} total={this.state.total} onChange={this.onChangePage} />,
        <ProductItem onCancel={()=>this.setState({item_visible:false})} visible={this.state.item_visible} data={this.state.item_data}/>
    </div>
    );
  }
}

export default Product;
