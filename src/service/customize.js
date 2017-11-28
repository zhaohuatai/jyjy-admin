import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function loadPubCustomizeDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubCustomize/loadPubCustomizeDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubCustomize(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubCustomize/loadPubCustomize`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updatePubCustomize(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubCustomize/updatePubCustomize`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadCaseSuccessDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/cases/caseSuccess/loadCaseSuccessDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadCaseSuccess(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/cases/caseSuccess/loadCaseSuccess`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteCaseSuccess(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/cases/caseSuccess/deleteCaseSuccess`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createCaseSuccess(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/cases/caseSuccess/createCaseSuccess`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateCaseSuccess(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/cases/caseSuccess/updateCaseSuccess`, param).then((data) => {
      resolve(data);
    });
  });
}
