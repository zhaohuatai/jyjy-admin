import React, {Component} from 'react';
import {Tabs} from 'antd';
import Category from './Category';
import Competition from './Competition';
import Evaluation from './Evaluation';
import Recommend from './Recommend';

const TabPane = Tabs.TabPane;

class Interlocution extends Component {

  render() {
    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="奖项评测列表" key="1">
            <Recommend/>
          </TabPane>
          <TabPane tab="分类管理" key="3">
            <Category/>
          </TabPane>
          <TabPane tab="竞赛管理" key="4">
            <Competition/>
          </TabPane>
          <TabPane tab="级别管理" key="5">
            <Evaluation/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Interlocution;
