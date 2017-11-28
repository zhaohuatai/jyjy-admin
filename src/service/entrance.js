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

//预约===============================================================================================

export function loadServiceEntranceAppointmentDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/loadServiceEntranceAppointmentDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function appointmentReturn(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/appointmentReturn`, param).then((data) => {
      resolve(data);
    });
  });
}

//分类===============================================================================================
export function loadEntranceCategoryFDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/loadCateFirstDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEntranceCategorySDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/loadCateSecondDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEntranceCategoryTDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/loadCateThirdDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceEntranceCateFirst(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/createServiceEntranceCateFirst`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceEntranceCateSecond(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/createServiceEntranceCateSecond`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceEntranceCateThird(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/createServiceEntranceCateThird`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateServiceEntranceCateFirst(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/updateServiceEntranceCateFirst`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateServiceEntranceCateSecond(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/updateServiceEntranceCateSecond`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateServiceEntranceCateThird(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/updateServiceEntranceCateThird`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteServiceEntranceCateFirst(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/deleteServiceEntranceCateFirst`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteServiceEntranceCateSecond(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/deleteServiceEntranceCateSecond`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteServiceEntranceCateThird(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/deleteServiceEntranceCateThird`, param).then((data) => {
      resolve(data);
    });
  });
}

export function setEntranceCateFirstIsTop(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/setEntranceCateFirstIsTop`, param).then((data) => {
      resolve(data);
    });
  });
}

export function setEntranceCateSecondIsTop(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/setEntranceCateSecondIsTop`, param).then((data) => {
      resolve(data);
    });
  });
}

export function setEntranceCateThirdIsTop(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/setEntranceCateThirdIsTop`, param).then((data) => {
      resolve(data);
    });
  });
}

export function setEntranceCateFirstShowIndex(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/setEntranceCateFirstShowIndex`, param).then((data) => {
      resolve(data);
    });
  });
}

export function setEntranceCateSecondShowIndex(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/setEntranceCateSecondShowIndex`, param).then((data) => {
      resolve(data);
    });
  });
}

export function setEntranceCateThirdShowIndex(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/entrance/category/setEntranceCateThirdShowIndex`, param).then((data) => {
      resolve(data);
    });
  });
}

