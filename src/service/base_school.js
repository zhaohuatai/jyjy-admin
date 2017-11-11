import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadDataCareerCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/data/dataCareerCategory/loadDataCareerCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}
