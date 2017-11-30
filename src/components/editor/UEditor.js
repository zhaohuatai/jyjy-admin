import React, {Component} from 'react';

// http://fex.baidu.com/ueditor/#start-toolbar
class UEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initEditor();
  }

  componentWillUnmount() {
    UE.delEditor(this.props.id);
  }

  initEditor() {
    const {initValue, id, module} = this.props;

    const UEditor = UE.getEditor(this.props.id, {
      // serverUrl: ATT_DOMAIN,
    });

    const self = this;
    UEditor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }
      if (initValue) {
        UEditor.setContent(initValue);
      }
      UEditor.execCommand('serverparam', {
        module: module ? 'default' : module
      })
    })
  }

  render() {
    return (
      <div id={this.props.id} name="content" type="text/plain" style={{width: '100%'}}/>
    )
  }
}

export default UEditor;
