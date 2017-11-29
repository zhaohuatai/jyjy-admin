import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

/**
 * 升学百科问答
 */
export function loadInterlocutionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocution/loadInterlocutionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadInterlocution(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocution/loadInterlocution`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteInterlocution(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocution/deleteInterlocution`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createInterlocution(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocution/createInterlocution`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateInterlocution(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocution/updateInterlocution`, param).then((data) => {
      resolve(data);
    });
  });
}

/**
 * 自主招生问答分类
 */

export function loadInterlocutionCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionCategory/loadInterlocutionCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createInterlocutionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionCategory/createInterlocutionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteInterlocutionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionCategory/deleteInterlocutionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}


/**
 * 自主招生问答
 */
export function loadInterlocutionConsultationDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionConsultation/loadInterlocutionConsultationDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteInterlocutionConsultation(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionConsultation/deleteInterlocutionConsultation`, param).then((data) => {
      resolve(data);
    });
  });
}

export function answerConsultation(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionConsultation/answerConsultation`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadInterlocutionConsultation(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionConsultation/loadInterlocutionConsultation`, param).then((data) => {
      resolve(data);
    });
  });
}

export function setInterlocutionConsultationHandled(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/interlocution/interlocutionConsultation/setInterlocutionConsultationHandled`, param).then((data) => {
      resolve(data);
    });
  });
}