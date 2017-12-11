import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function createPubNews(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNews/createPubNews`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deletePubNews(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNews/deletePubNews`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubNews(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNews/loadPubNews`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubNewsDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNews/loadPubNewsDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updatePubNews(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNews/updatePubNews`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createPubNewsCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNewsCategory/createPubNewsCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deletePubNewsCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNewsCategory/deletePubNewsCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubNewsCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubNewsCategory/loadPubNewsCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}


