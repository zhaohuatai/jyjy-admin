import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';

export function loadMemberTeacherDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/loadMemberTeacherDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadMemberTeacher(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/loadMemberTeacher`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteMemberTeacher(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/deleteMemberTeacher`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateMemberTeacher(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/updateMemberTeacher`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createMemberTeacher(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/createMemberTeacher`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadMemberVipCardDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberVipCard/loadMemberVipCardDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadMemberDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/loadMemberDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadMemberTeacherAppointmentDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/loadMemberTeacherAppointmentDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function doAppointmentReturn(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/member/memberTeacher/doAppointmentReturn`, param).then((data) => {
      resolve(data);
    });
  });
}
