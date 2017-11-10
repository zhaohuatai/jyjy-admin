var React = require('react');
var PropTypes = React.PropTypes;
import {API_DOMAIN} from '../../config';
import {
  Form, Card,Select, InputNumber, Switch, Radio, Input,Row,Col,message,
  Slider, Button, Upload, Icon,Modal
} from 'antd';

const FormItem = Form.Item;

var OrderItem= React.createClass({

  render: function() {
    const { getFieldDecorator } = this.props.form;
    const {onCancel,visible,data} = this.props;
    const {buyer,orders,orderResultItemDto,seller} = data;
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
        title="订单详情"
        width='600px'
				footer={null}
				onCancel={onCancel}
      >
        <FormItem
          {...formItemLayout}
          label="买家真实姓名"
        >
        {getFieldDecorator('name', {
          initialValue:buyer.member.name
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="买家昵称"
        >
        {getFieldDecorator('nickName', {
          initialValue:buyer.member.nickName
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="买家电话"
        >
        {getFieldDecorator('phone', {
          initialValue:buyer.member.phone
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="卖家真实姓名"
        >
        {getFieldDecorator('name', {
          initialValue:seller.member.name
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="卖家昵称"
        >
        {getFieldDecorator('nickName', {
          initialValue:seller.member.nickName
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="商品名称"
        >
        {getFieldDecorator('productName', {
          initialValue:orderResultItemDto[0].product.productName
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="年代"
        >
        {getFieldDecorator('age', {
          initialValue:orderResultItemDto[0].product.age
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="作者"
        >
        {getFieldDecorator('author', {
          initialValue:orderResultItemDto[0].product.author
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="尺寸"
        >
        {getFieldDecorator('sizex', {
          initialValue:orderResultItemDto[0].product.sizex
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="售价"
        >
        {getFieldDecorator('sellPrice', {
          initialValue:orderResultItemDto[0].product.sellPrice
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="商品id"
        >
        {getFieldDecorator('id', {
          initialValue:orderResultItemDto[0].product.id
        })(
          <Input readOnly/>
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="图片"
        >
        {getFieldDecorator('productName', {
          initialValue:orderResultItemDto[0].product.mainImage
        })(
          <Card style={{ width: 150 }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img alt="example" width="100%" src={API_DOMAIN+orderResultItemDto[0].product.mainImage} />
            </div>
          </Card>
        )}
        </FormItem>
      </Modal>
    );
  }

});
module.exports =  Form.create()(OrderItem);
