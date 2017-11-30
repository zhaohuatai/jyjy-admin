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
        <Tabs defaultActiveKey="4">
          <TabPane tab="竞赛分类" key="1">
            <Category/>
          </TabPane>
          <TabPane tab="竞赛管理" key="2">
            <Competition/>
          </TabPane>
          <TabPane tab="得奖奖别" key="3">
            <Evaluation/>
          </TabPane>
          <TabPane tab="奖项测评数据" key="4">
            <Recommend/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Interlocution;
