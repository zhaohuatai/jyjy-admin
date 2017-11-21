import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';

export function loadColumnChannelDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/loadColumnChannelDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/deleteColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/createColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/loadColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/updateColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}
