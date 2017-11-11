import React, { Component } from 'react';
import style from './setting.scss';
import {loadDicSysconfigDataSet} from '../../service/auth';
import { Tabs } from 'antd';
import Sysconfig from './Sysconfig';

const TabPane = Tabs.TabPane;

class Setting extends Component {
  componentDidMount(){
    loadDicSysconfigDataSet({},data=>{

    })
  }
  render() {
    return (
      <div className={style.orderroot} >
        <Tabs defaultActiveKey="1" >
          <TabPane tab="系统配置" key="1">
            <Sysconfig />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Setting;