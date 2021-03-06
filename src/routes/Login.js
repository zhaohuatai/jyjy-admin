import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import md5 from 'blueimp-md5';
import {Button, Form, Icon, Input, message} from 'antd';
import {API_DOMAIN, siteName} from '../utils/config';
import {doWebLogin} from '../service/auth';

import style from './Login.scss'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  //刷新验证码
  refesh = () => {
    let captcha = API_DOMAIN + 'api/auth/captcha?' + Math.floor(Math.random() * 100);
    this.setState({captcha: captcha});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let salt = 'zhtframework_94DABGioQOq2tTUO0AXYow';
        let md5_password = md5(salt + values.password);
        let param = {
          "username": values.username,
          "password": md5_password,
          "captcha": values.captcha,
          "loginOrgin": "PC"
        };
        doWebLogin(param, data => {
          if (data.statusCode === 200) {
            this.props.onDoLogin({username: 'admin', status: 1});
            hashHistory.push('/');
          } else {
            message.warn(data.message);
          }
        });

        //hashHistory.push('/');
      }
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      captcha: API_DOMAIN + 'api/auth/captcha'
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={style.form}>
        <div className={style.logo}>
          {/* <img alt={'logo'} src={config.logo} /> */}
          <span>{siteName}</span>
        </div>
        <Form onSubmit={this.handleSubmit} className={style.loginform}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{required: true, message: '请输入账号'}],
            })(
              <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="账号"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('captcha', {
              rules: [{required: true, message: '请输入验证码'}],
            })(
              <Input prefix={<Icon type="wallet" style={{fontSize: 13}}/>} placeholder="验证码"/>
            )}
          </FormItem>
          <img onClick={this.refesh} style={{height: '40px'}} src={this.state.captcha}/>
          <FormItem>
            <Button type="primary" htmlType='submit' className={style.loginformbutton}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDoLogin: (userInfo) => {
      dispatch(() => {
        return {
          type: 'LOGIN',
          userInfo
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
