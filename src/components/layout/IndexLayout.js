import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Footer, Icon, Layout, Menu} from 'antd';
import IndexHeader from './Header';
import style from './Layout.scss';
import {loadCategoryTree} from '../../service/auth';
import {siteName} from "../../utils/config";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class IndexLayout extends React.Component {
  state = {
    collapsed: false,
    menudata: [],
    selectedkey: ['/product']
  };
  onCollapse = (collapsed) => {
    this.setState({collapsed});
  }
  handelSelect = ({key}) => {
    hashHistory.push(key)
    this.setState({
      selectedkey: [key]
    });
  }
  handleHeaderAction = ({key}) => {
    switch (key) {
      case 'logout':
        //登出存在问题
        hashHistory.push('/login');
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    let path = hashHistory.getCurrentLocation().pathname;
    loadCategoryTree({}, data => {
      this.setState({
        menudata: data.data.navMenuData,
        selectedkey: [path]
      });
    })
  }

  render() {
    const {userinfo} = this.props;
    return (
      <Layout>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div style={{textAlign: 'center'}} className={style.logo}>{siteName}</div>
          <Menu theme="dark" defaultSelectedKeys={['/']} selectedKeys={this.state.selectedkey} mode="inline"
                onClick={this.handelSelect}>
            {
              this.state.menudata.map(item => {
                if (item.items) {
                  return (
                    <SubMenu key={item.title} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                      {
                        item.items.map(subitem => {
                          return <Menu.Item key={subitem.url}>{subitem.title}</Menu.Item>
                        })
                      }
                    </SubMenu>
                  )
                } else {
                  return (
                    <Menu.Item key={item.url}>
                      <Icon type={item.icon}/>
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

function mapStatetoProps(state) {
  return {
    userinfo: state.session.userinfo
  }
}


export default connect(mapStatetoProps)(IndexLayout);