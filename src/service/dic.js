import { post, postImg } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadProvinceList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/dic/dicAreas/loadProvinceList`, param).then((data) => {
      resolve(data);
    });
  });
}
