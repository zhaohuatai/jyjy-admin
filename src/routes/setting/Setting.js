import React, {Component} from 'react';
import {loadDicSysconfigDataSet} from '../../service/auth';
import {Tabs} from 'antd';
import Sysconfig from './Sysconfig';

const TabPane = Tabs.TabPane;

class Setting extends Component {
  componentDidMount(){
    loadDicSysconfigDataSet({},data=>{

    })
  }
  render() {
    return (
      <div style={{backgroundColor: '#fff', padding: '10px'}}>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="配置" key="1">
            <Sysconfig />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Setting;