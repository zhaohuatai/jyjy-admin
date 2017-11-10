import React, { Component } from 'react';
import style from './trading.scss';
import { Tabs } from 'antd';
import Deposit from './deposit/Deposit';
import Intro from './intro/Intro';
import Log from './log/Log';
import Recharge from './recharge/Recharge';
import Withdraw from './withdraw/Withdraw';

const TabPane = Tabs.TabPane;

class Trading extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={style.orderroot} >
        <Tabs defaultActiveKey="1" >
          <TabPane tab="会员保证金" key="1">
            <Deposit />
          </TabPane>
          <TabPane tab="会员推广" key="2">
            <Intro />
          </TabPane>
          <TabPane tab="会员交易" key="3">
            <Log />
          </TabPane>
          <TabPane tab="会员提现" key="5">
            <Withdraw />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Trading;
