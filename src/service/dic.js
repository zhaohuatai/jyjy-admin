import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function loadProvinceList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/dic/dicAreas/loadProvinceList`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDicAreaList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/dic/dicAreas/loadDicAreaList`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDicData(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/dic/dicData/loadDicData`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDicData(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/dic/dicData/deleteDicData`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDicData(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/dic/dicData/createDicData`, param).then((data) => {
      resolve(data);
    });
  });
}
