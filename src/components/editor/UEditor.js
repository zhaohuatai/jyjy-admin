import React, {Component} from 'react';
import {API_DOMAIN} from "../../utils/config";

// http://fex.baidu.com/ueditor/#start-toolbar
class UEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uedeitor = {}
  }

  componentDidMount() {
    this.initEditor();
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);
  }

  initEditor() {
    const {initValue, uploadAPI, id} = this.props;

    this.uedeitor = UE.getEditor(this.props.id, {
      serverUrl: uploadAPI,
    });

    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function (action) {
      if (action === "uploadimage" || action === 'uploadscrawl' || action === 'uploadimage' || action === 'uploadvideo') {
        return API_DOMAIN + 'admin/ueditor/attachment/upload';
      } else {
        return this._bkGetActionUrl.call(this, action);
      }
    }

    const self = this;
    this.uedeitor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }
      if (initValue) {
        this.uedeitor.setContent(initValue);
      }
    })
  }

  componentDidUpdate() {
    // 解决同页面 初始值不更新的问题
    // const {initValue} = this.props;
    // this.uedeitor.ready((ueditor) => {
    //
    //   if (initValue) {
    //     this.uedeitor.setContent(initValue);
    //   }
    // })
    console.log(this.uedeitor);
  }

  render() {
    return (
        <div>
          <div id={this.props.id} name="content" type="text/plain" style={{ width: '100%' }} />
          <button onClick={() => this.uedeitor.setContent(this.props.initValue)} style={{ float: 'right', margin: '10px 0', width: '100px' }}>刷新编辑器</button>
        </div>
    )
  }
}

export default UEditor;
