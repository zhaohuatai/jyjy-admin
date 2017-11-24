import React, {Component} from 'react';

// http://fex.baidu.com/ueditor/#start-toolbar
class UEditor extends Component {
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
    const {initValue, uploadAPI, id} = this.props;

    const ueEditor = UE.getEditor(this.props.id, {
      serverUrl: uploadAPI
    });
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
      <div id={this.props.id} name="content" type="text/plain" style={{width: '100%'}}/>
    )
  }
}

export default UEditor;
