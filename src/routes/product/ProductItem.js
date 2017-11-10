var React = require('react');
var PropTypes = React.PropTypes;
import {API_DOMAIN} from '../../config';
import {
  Form, Card,Select, InputNumber, Switch, Radio, Input,Row,Col,message,
  Slider, Button, Upload, Icon,Modal
} from 'antd';

const FormItem = Form.Item;

var ProductItem= React.createClass({

  render: function() {
    const { getFieldDecorator } = this.props.form;
    const {onCancel,visible,data} = this.props;
    console.log(data);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <Modal
        visible={visible}
        title="详情"
        width='600px'
				footer={null}
				onCancel={onCancel}
      >
        <Form >
          <FormItem
            {...formItemLayout}
            label="名称"
            initialValue={data.productName}
          >
          {getFieldDecorator('productName', {
            initialValue:data.productName,
          })(
            <Input readOnly/>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="售价"
            initialValue={data.productName}
          >
          {getFieldDecorator('sellPrice', {
            initialValue:data.sellPrice*0.01,
          })(
            <Input readOnly/>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="商品编码"
            initialValue={data.productName}
          >
          {getFieldDecorator('productsn', {
            initialValue:data.productsn,
          })(
            <Input readOnly/>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发布者真实姓名"
            initialValue={data.productName}
          >
          {getFieldDecorator('name', {
            initialValue:data.seller.name,
          })(
            <Input readOnly/>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发布者昵称"
            initialValue={data.productName}
          >
          {getFieldDecorator('nickName', {
            initialValue:data.seller.nickName,
          })(
            <Input readOnly/>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发布者电话"
            initialValue={data.productName}
          >
          {getFieldDecorator('phone', {
            initialValue:data.seller.phone,
          })(
            <Input readOnly/>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="图片"
          >
          {getFieldDecorator('productName', {
            initialValue:data.productName,
          })(
            <Card style={{ width: 150 }} bodyStyle={{ padding: 0 }}>
              <div className="custom-image">
                <img alt="example" width="100%" src={API_DOMAIN+data.mainImage} />
              </div>
            </Card>
          )}
          </FormItem>

          
       </Form>
      </Modal>
    );
  }

});
module.exports =  Form.create()(ProductItem);
