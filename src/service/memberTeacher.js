import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function loadMemberTeacherDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/loadMemberTeacherDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}
