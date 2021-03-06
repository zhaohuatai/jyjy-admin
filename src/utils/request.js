import 'whatwg-fetch';
import {hashHistory} from 'react-router';
import {API_DOMAIN} from './config';
import {message} from 'antd';
import md5 from 'blueimp-md5';

/**
 * 状态码错误名称
 * @param {int} statusCode
 * @param message
 */
const checkCode = (statusCode, message) => {
  if (statusCode === 200) {
    return {code: statusCode, message};
  }

  switch (statusCode) {
    case 300:
      return {code: statusCode, message};
    case 301:
    case 4010:
      hashHistory.push('/login');
      return {code: statusCode, message};
    case 4011:
      return {code: statusCode, message};
    case 4004:
      return {code: statusCode, message}; // 非vip
    case 500:
      return {code: statusCode, message};
    default:
      return {code: statusCode, message};
  }
};

/**
 * fetch.get请求封装
 */
export function get(url, params = '') {
  let paramsurl;
  if (params) {
    const paramsArray = [];
    // encodeURIComponent
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join('&')}`;
    } else {
      url += `&${paramsArray.join('&')}`;
    }

    paramsurl = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }).join('&')
  }

  return new Promise(((resolve, reject) => {
    fetch(url+paramsurl, {
      method: 'get',
    }).then((response) => {
      response.json();
    }).then((responseData) => {
      const checkCodeResult = checkCode(responseData.statusCode);
      if (checkCodeResult.code === 200) {
        resolve(responseData);
      } else {
        message.info(checkCodeResult.message);
        reject(checkCodeResult.message);
      }
    }).catch((err) => {
      reject(err);
    });
  }));
}

/**
 * fetch.post请求封装
 */
export function post(url, params = '') {
  let paramsurl = '';

  // json 序列化
  if (params) {
    // const paramsArray = [];
    // // encodeURIComponent
    // Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    //
    // paramsurl += paramsArray.join('&');

    paramsurl = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }).join('&')
  }

  return new Promise(((resolve, reject) => {
    fetch(url, {
      method: 'post',
      body: paramsurl,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then((response) => {
      return response.json();
    }).then((responseData) => {
      const checkCodeResult = checkCode(responseData.statusCode, responseData.message);
      if (checkCodeResult.code === 200) {
        resolve(responseData);
      } else {
        message.info(checkCodeResult.message);
        reject(checkCodeResult.message);
      }
    }).catch((err) => {
      reject(err);
    });
  }));
}

// 上传图片请求
export function postImg(url, params = '') {
  let headers = new Headers();
  //headers.set('Content-Type','multipart/form-data; boundary=----WebKitFormBoundary4I9QTerA7b4BBalV');
  headers.set('X-Requested-With', 'XMLHttpRequest');

  return new Promise(((resolve, reject) => {
    fetch(url, {
      method: 'post',
      mode: 'cors',
      credentials: 'include',
      headers,
      body: params,
    }).then((response) => {
      return response.json();
    }).then((responseData) => {
      const checkCodeResult = checkCode(responseData.statusCode, responseData.message);
      if (checkCodeResult.code === 200) {
        resolve(responseData);
      } else {
        reject(checkCodeResult.message);
      }
    }).catch((err) => {
      reject(err);
    });
  }));
}

// 获取登录验证码
export function getCaptcha(getDate) {
  fetch(`${API_DOMAIN}api/auth/captcha`, {
    method: 'get',
    mode: 'no-cors',
  }).then((response) => {
    response.json();
  })
    .then((responseData) => {
      getDate(responseData);
    });
}

// web登录
export function doWebLogin(paramsArray, getDate) {
  const salt = 'zhtframework_94DABGioQOq2tTUO0AXYow';
  paramsArray.password = md5(salt + paramsArray.password);

  const formBody = Object.keys(paramsArray).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsArray[key])}`).join('&');

  let headers = new Headers();
  headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  headers.set('X-Requested-With', 'XMLHttpRequest');

  fetch(`${API_DOMAIN}api/auth/login`, {
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: formBody,
  }).then((response) => response.json()).then((responseData) => {
    getDate(responseData);
  });
}

