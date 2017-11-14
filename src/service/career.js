import { post, postImg } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadDataCareerDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareer/loadDataCareerDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataCareer(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareer/loadDataCareer`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataCareer(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareer/deleteDataCareer`, param).then((data) => {
      resolve(data);
    });
  });
}