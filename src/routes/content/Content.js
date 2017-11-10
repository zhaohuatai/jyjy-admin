import React, { Component } from 'react';
import style from './content.scss';

import Post from './post/Post';
import Ad from './ad/Ad';
import Term from './term/Term';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Content extends Component {

  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    return (
      <div className={style.postcontent} >
        <Tabs defaultActiveKey="1" >
          <TabPane tab="文章" key="1">
            <Post />
          </TabPane>
          <TabPane tab="广告" key="2">
            <Ad />
          </TabPane>
          <TabPane tab="协议" key="3">
            <Term />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Content;
