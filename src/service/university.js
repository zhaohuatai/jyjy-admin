import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

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
