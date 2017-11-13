import { post, postImg } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/loadDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

