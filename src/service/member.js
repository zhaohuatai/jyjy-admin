import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';

export function loadMemberTeacherDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/loadMemberTeacherDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}
