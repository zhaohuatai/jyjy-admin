import React, { Component } from 'react';

class Ueditor extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.initEditor();
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);
  }

  initEditor() {
    const { initValue, id} = this.props;

    const ueEditor = UE.getEditor(this.props.id);
    const self = this;
    ueEditor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }
      if(initValue){
        ueEditor.setContent(initValue);
      }
    })
  }
  render(){
    return (
      <div id={this.props.id} name="content" type="text/plain" style={{width: '100%'}}></div>
    )
  }
}
export default Ueditor;
