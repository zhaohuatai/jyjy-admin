import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

/*
自招大数据
 */

export function loadEnrollAutoBigdataDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoBigdata/loadEnrollAutoBigdataDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteEnrollAutoBigdata(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoBigdata/deleteEnrollAutoBigdata`, param).then((data) => {
      resolve(data);
    });
  });
}
export function createEnrollAutoBigdata(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoBigdata/createEnrollAutoBigdata`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoBigdata(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoBigdata/loadEnrollAutoBigdata`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateEnrollAutoBigdata(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoBigdata/updateEnrollAutoBigdata`, param).then((data) => {
      resolve(data);
    });
  });
}

