import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';

export function loadDataScoreLineDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/loadDataScoreLineDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/loadDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/deleteDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/createDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/updateDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

//省


export function loadDataScoreLineProvinceDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/loadDataScoreLineProvinceDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/loadDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/deleteDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/createDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/updateDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}
