import React, { Component } from 'react';
import {Modal,Transfer} from 'antd';
import {loadAuthPermissionList} from '../../../service/auth';

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddPerms extends Component {
  constructor(props){
    super(props);
    this.state={
      PermData: [],
      targetKeys: [],
    };
  }

  componentDidMount(){
    loadAuthPermissionList({appKey:'APP_ROOT',rows:1000},data=>{
      this.setState({
        PermData:data.rows
      })
    })
  }

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  }
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

	onOk=()=>{
		this.props.onOk(this.state.targetKeys);
	}

  render() {
    const {onCancel,visible,onOk} = this.props;

    return (
      <Modal
        visible={visible}
        title="添加角色权限"
        width='600px'
				onCancel={onCancel}
				okText='提交'
				onOk={this.onOk}
      >
        <Transfer
            dataSource={this.state.PermData}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.name}
						rowKey={record => record.id}
						listStyle={{height:'500px'}}
        />
      </Modal>
    );
  }
}

export default AddPerms;
