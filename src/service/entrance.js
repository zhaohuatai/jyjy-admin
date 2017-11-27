import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function loadServiceEntranceDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/loadServiceEntranceDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceEntrance(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/loadServiceEntrance`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteServiceEntrance(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/deleteServiceEntrance`, param).then((data) => {
      resolve(data);
    });
  });
}