import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio, Input,Row,Col,message,Card,
  Slider, Button, Upload, Icon,Modal
} from 'antd';
import {uploadProductAdvImage} from '../../../http';
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
      productinfo:{}
    };
  }

  componentDidMount(){

  }

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = this.props.data.id;
        values.enabled ? values.enabled = 1 : values.enabled = 0;
        updateRole(values,data=>{
          message.success(data.message);
          this.props.doUpdateSuccess()
        })
      }
    });
  }

  handleDeletePerm = (tag,roleId) =>{
    removePermsFromRole({'permIds[]':tag,roleId:roleId},data=>{
      if(data.statusCode==200){
        message.success(data.message);
      }
    })
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    // fileList.forEach((file) => {
    //   formData.append('files[]', file);
    // });
    formData.append('file', fileList[0]);
    formData.append('productAdvId', this.props.data.id);

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    uploadProductAdvImage(formData,data=>{
      if(data.statusCode==200){
        message.success('操作成功')
      }else{
        message.warn(data.message)
      }
      this.props.onOk();
      this.setState({
        uploading:false,
        fileList:[],
      });
    })
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
        title="广告详情"
        width='600px'
				footer={null}
				onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="商品名称"
            {...formItemLayout}
          >
            {getFieldDecorator('productId', {
              rules: [{ required: true, message: '名称!' }],
              initialValue:data.productinfo.productName,
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            label="年代"
            {...formItemLayout}
          >
            {getFieldDecorator('productId', {
              rules: [{ required: true, message: '名称!' }],
              initialValue:data.productinfo.age,
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            label="作家"
            {...formItemLayout}
          >
            {getFieldDecorator('productId', {
              rules: [{ required: true, message: '名称!' }],
              initialValue:data.productinfo.author,
            })(
              <Input readOnly={this.state.editable}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="广告缩略图"
          >
          {getFieldDecorator('productName', {
            initialValue:data.image,
          })(
            <Card style={{ width: 150 }} bodyStyle={{ padding: 0 }}>
              <div className="custom-image">
                <img alt="example" width="100%" src={API_DOMAIN+data.image} />
              </div>
            </Card>
          )}
          </FormItem>
            <FormItem
              {...formItemLayout}
              label="上传缩略图"
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
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Item);
