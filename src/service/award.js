import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

/*
 分类
 */
export function loadEnrollAutoAwardCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardCategory/loadEnrollAutoAwardCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createEnrollAutoAwardCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardCategory/createEnrollAutoAwardCategory`, param).then((data) => {
      resolve(data);
    });
  });
}
export function deleteEnrollAutoAwardCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardCategory/deleteEnrollAutoAwardCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

/*
 竞赛
 */
export function loadEnrollautoAwardCompetitionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollautoAwardCompetition/loadEnrollautoAwardCompetitionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}
export function createEnrollautoAwardCompetition(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollautoAwardCompetition/createEnrollautoAwardCompetition`, param).then((data) => {
      resolve(data);
    });
  });
}
export function deleteEnrollautoAwardCompetition(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollautoAwardCompetition/deleteEnrollautoAwardCompetition`, param).then((data) => {
      resolve(data);
    });
  });
}

/*
 级别
 */
export function loadEnrollAutoAwardEvaluationDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardEvaluation/loadEnrollAutoAwardEvaluationDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}
export function deleteEnrollAutoAwardEvaluation(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardEvaluation/deleteEnrollAutoAwardEvaluation`, param).then((data) => {
      resolve(data);
    });
  });
}
export function createEnrollAutoAwardEvaluation(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardEvaluation/createEnrollAutoAwardEvaluation`, param).then((data) => {
      resolve(data);
    });
  });
}

/*
 大学
 */
export function loadEnrollAutoAwardRecommendDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardRecommend/loadEnrollAutoAwardRecommendDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createEnrollAutoAwardRecommend(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardRecommend/createEnrollAutoAwardRecommend`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteEnrollAutoAwardRecommend(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/enroll/enrollAutoAwardRecommend/deleteEnrollAutoAwardRecommend`, param).then((data) => {
      resolve(data);
    });
  });
}