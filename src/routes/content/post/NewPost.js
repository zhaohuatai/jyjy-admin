import React from 'react';
import {createPubArticleImage} from '../../../http';
import {
  Form, Select, InputNumber, Switch, Radio, Input, message,
  Slider, Button, Upload, Icon,Modal
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class NewPost extends React.Component {
  constructor(props){
    super(props);
    this.state={
      mainfileList: [],
      mainuploading: false,
      thumbfileList: [],
      thumbuploading: false,
      id:null,
      showIndex:''

    }
  }

  handleUploadMianImage = () => {
    const { mainfileList } = this.state;
    const formData = new FormData();

    formData.append('file', mainfileList[0]);
    formData.append('type', '1');
    formData.append('showIndex', this.state.showIndex);

    this.setState({
      uplomainuploadingading: true,
    });

    // You can use any AJAX library you like
    createPubArticleImage(formData,data=>{
      if(data.statusCode==200){
        message.success('主图上传成功');
        this.setState({id:data.data.id});
      }else{
        message.warn(data.message)
      }
      this.setState({
        mainuploading:false,
      });
    })
  }

  handleUploadThumb = () => {
    const { thumbfileList,id } = this.state;
    const formData = new FormData();
    const {onOk} = this.props;

    if(id){
      formData.append('file', thumbfileList[0]);
      formData.append('type', '2');
      formData.append('id',id)

      this.setState({
        thumbuploading: true,
      });

      // You can use any AJAX library you like
      createPubArticleImage(formData,data=>{
        if(data.statusCode==200){
          message.success('主图上传成功');
        }else{
          message.warn(data.message)
        }
        this.setState({
          thumbuploading:false,
          thumbfileList:[],
          mainfileList:[]
        });

        onOk();
      })
    }else{
      alert('请先上传主图')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {onCancel,visible} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { thumbuploading,mainuploading } = this.state;

    const mainuploadprops = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ mainfileList }) => {
          const index = mainfileList.indexOf(file);
          const newFileList = mainfileList.slice();
          newFileList.splice(index, 1);
          return {
            mainfileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ mainfileList }) => ({
          mainfileList: [...mainfileList, file],
        }));
        return false;
      },
      fileList: this.state.mainfileList,
    };

    const thumbuploadprops = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ thumbfileList }) => {
          const index = thumbfileList.indexOf(file);
          const newFileList = thumbfileList.slice();
          newFileList.splice(index, 1);
          return {
            thumbfileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ thumbfileList }) => ({
          thumbfileList: [...thumbfileList, file],
        }));
        return false;
      },
      fileList: this.state.thumbfileList,
    };

    return (
      <Modal
      visible={visible}
      title="新建文章"
      okText="发布"
      width='600px'
      footer={false}
      onCancel={onCancel}
      onOk={this.handleSubmit}
    >
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="排序"
          {...formItemLayout}
        >
          <InputNumber onChange={(value)=>this.setState({showIndex:value})}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传主图"
        >
        <Upload {...mainuploadprops}>
          <Button>
            <Icon type="upload" /> 选择主图
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUploadMianImage}
          disabled={this.state.mainfileList.length === 0}
          loading={mainuploading}
        >
          {mainuploading ? '上传中' : '上传' }
        </Button>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="上传缩略图"
      >
      <Upload {...thumbuploadprops}>
        <Button>
          <Icon type="upload" /> 选择缩略图
        </Button>
      </Upload>
      <Button
        className="upload-demo-start"
        type="primary"
        onClick={this.handleUploadThumb}
        disabled={this.state.thumbfileList.length === 0}
        loading={thumbuploading}
      >
        {thumbuploading ? '上传中' : '上传' }
      </Button>
    </FormItem>
      </Form>
      </Modal>
    );
  }
}

export default Form.create()(NewPost);
