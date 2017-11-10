import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory} from 'react-router';
import { Layout, Menu, Breadcrumb, Icon ,Footer} from 'antd';
import IndexHeader from './Header';
import style from './Layout.scss';
import {loadCategoryTree} from '../../http';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class IndexLayout extends React.Component {
  state = {
    collapsed: false,
    menudata:[],
    selectedkey:['/product']
  };

  componentDidMount(){
    let path = hashHistory.getCurrentLocation().pathname;
    loadCategoryTree(data=>{
      this.setState({
        menudata:data.data.navMenuData,
        selectedkey:[path]
      });
    })
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  
  handelSelect=({key})=>{
    hashHistory.push(key)
    this.setState({
      selectedkey:[key]
    });
  }

  handleHeaderAction=({ item, key, keyPath })=>{
    switch (key) {
      case 'logout':
        document.cookie = '';
        hashHistory.push('/login');
        break;
    
      default:
        break;
    }
    
  }

  render() {
    const {userinfo} = this.props;
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={style.logo} >水墨人生-后台</div>
          <Menu theme="dark" defaultSelectedKeys={['/']} selectedKeys={this.state.selectedkey} mode="inline" onClick={this.handelSelect}>
            {
              this.state.menudata.map(item=>{
                if(item.items){
                  return (
                    <SubMenu key={item.title} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                      {
                        item.items.map(subitem=>{
                          return <Menu.Item key={subitem.url}>{subitem.title}</Menu.Item>
                        })
                      }
                    </SubMenu>
                  )
                }else{
                  return (
                    <Menu.Item key={item.url}>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </Menu.Item>
                  )
                }
              })
            }
          </Menu>
        </Sider>
        <IndexHeader user={userinfo} childern={this.props.children} action={this.handleHeaderAction}/>
      </Layout>
    );
  }
}

function mapStatetoProps(state){
  return {
    userinfo: state.session.userinfo
  }
}


export default connect(mapStatetoProps)(IndexLayout);