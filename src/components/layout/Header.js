import React from 'react';
import style from './Layout.scss';
import { Menu, Icon, Popover, Layout } from 'antd';

const SubMenu = Menu.SubMenu
const { Header, Content, Sider, Footer } = Layout;
const IndexHeader = ({user,childern,action}) => {
  return(
    <Layout className={style.rightlayout}>
      <Header className={style.headerbox} >
        <Menu mode="horizontal" className={style.header} onClick={({ item, key, keyPath })=>action({ item, key, keyPath })}>
          <SubMenu
            title={<span>
              <Icon type="user" />
              {user.username}
            </span>}
          >
            <Menu.Item key="logout">
              退出
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content className={style.content}>
        {childern}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2017 Created by 水墨人生
      </Footer>
    </Layout>
    
  );
};

export default IndexHeader;