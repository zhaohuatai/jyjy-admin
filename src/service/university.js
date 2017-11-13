import { post, postImg } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/loadDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataUniversityDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/loadDataUniversityDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/deleteDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/createDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/updateDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

export function uploadBadge(param) {
  return new Promise((resolve, reject) => {
    postImg(`${API_DOMAIN}admin/data/dataUniversity/uploadBadge`, param).then((data) => {
      resolve(data);
    });
  });
}