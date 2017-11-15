import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadPubSlideDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubSlide/loadPubSlideDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubSlide(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubSlide/loadPubSlide`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deletePubSlide(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubSlide/deletePubSlide`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createPubSlide(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubSlide/createPubSlide`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updatePubSlide(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/pub/pubSlide/updatePubSlide`, param).then((data) => {
      resolve(data);
    });
  });
}
