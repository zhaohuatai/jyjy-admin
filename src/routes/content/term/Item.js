import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio, Input,Row,Col,message,Card,
  Slider, Button, Upload, Icon,Modal
} from 'antd';
import {createPubArticleImage} from '../../../http';
import {API_DOMAIN} from '../../../config';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Item extends Component {
  constructor(props){
    super(props);
    this.state={
      editable:true,
      applist:[],
      fileList: [],
      uploading: false,
    };
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();

    formData.append('file', fileList[0]);
    formData.append('type', '2');
    formData.append('id',this.props.data.id)

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    createPubArticleImage(formData,data=>{
      if(data.statusCode==200){
        message.success('操作成功')
      }else{
        message.warn(data.message)
      }
      this.setState({
        uploading:false,
        fileList:[],
      });
      this.props.onOk();
    })
  }

  createHtml=(html)=>{
       return {__html: html};
  }

  render() {
    const { getFieldDecorator,getFieldsError } = this.props.form;
    const {onCancel,visible,data} = this.props;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };
    const { uploading } = this.state;
    const uploadprops = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <Modal
        visible={visible}
        title="协议详情"
        width='800px'
				footer={null}
				onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
          {getFieldDecorator('title', {
            initialValue:data.title,
          })(
            <Input readOnly/>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内容"
          >
          {getFieldDecorator('title', {
            initialValue:data.title,
          })(
            <div dangerouslySetInnerHTML={this.createHtml(data.content)} />
          )}
          </FormItem>
          {/*
          <FormItem
            {...formItemLayout}
            label="缩略图"
          >
          {getFieldDecorator('productName', {
            initialValue:data.image,
          })(
            <Card style={{ width: 150 }} bodyStyle={{ padding: 0 }}>
              <div className="custom-image">
                <img alt="example" width="100%" src={API_DOMAIN+data.thumbnailImagePath} />
              </div>
            </Card>
          )}
          </FormItem>


            <FormItem
              {...formItemLayout}
              label="主图"
            >
            {getFieldDecorator('productName', {
              initialValue:data.image,
            })(
              <Card style={{ width: 150 }} bodyStyle={{ padding: 0 }}>
                <div className="custom-image">
                  <img alt="example" width="100%" src={API_DOMAIN+data.mainImagePath} />
                </div>
              </Card>
            )}
            </FormItem>
              <FormItem
                {...formItemLayout}
                label="更新缩略图"
              >
              <Upload {...uploadprops}>
                <Button>
                  <Icon type="upload" /> 选择文件
                </Button>
              </Upload>
              <Button
                className="upload-demo-start"
                type="primary"
                onClick={this.handleUpload}
                disabled={this.state.fileList.length === 0}
                loading={uploading}
              >
                {uploading ? '上传中' : '开始上传' }
              </Button>
            </FormItem>
            */}


        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Item);
