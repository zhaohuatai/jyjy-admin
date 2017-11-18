import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';


export function loadServiceCourseCategory(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseCategory/loadServiceCourseCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseCategoryDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseCategory/loadServiceCourseCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteServiceCourseCategory(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseCategory/deleteServiceCourseCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceCourseCategory(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseCategory/createServiceCourseCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateServiceCourseCategory(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseCategory/updateServiceCourseCategory`, param).then((data) => {
      resolve(data);
    });
  });
}
