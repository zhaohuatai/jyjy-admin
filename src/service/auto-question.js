import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function loadEnrollAutoQuestionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestion/loadEnrollAutoQuestionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteEnrollAutoQuestion(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestion/deleteEnrollAutoQuestion`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createEnrollAutoQuestion(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestion/createEnrollAutoQuestion`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoQuestion(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestion/loadEnrollAutoQuestion`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateEnrollAutoQuestion(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestion/updateEnrollAutoQuestion`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoQuestionCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestionCategory/loadEnrollAutoQuestionCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}
export function deleteEnrollAutoQuestionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestionCategory/deleteEnrollAutoQuestionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}
export function createEnrollAutoQuestionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoQuestionCategory/createEnrollAutoQuestionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

