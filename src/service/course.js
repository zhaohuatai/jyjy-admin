import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';

export function loadServiceCourseDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourse/loadServiceCourseDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourse(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourse/loadServiceCourse`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteServiceCourse(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourse/deleteServiceCourse`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceCourse(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourse/createServiceCourse`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateServiceCourse(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourse/updateServiceCourse`, param).then((data) => {
      resolve(data);
    });
  });
}

export function uploadCover(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourse/uploadCover`, param).then((data) => {
      resolve(data);
    });
  });
}

// course-item
export function loadServiceCourseItemDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseItem/loadServiceCourseItemDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseItem/loadServiceCourseItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceCourseItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseItem/createServiceCourseItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteServiceCourseItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseItem/deleteServiceCourseItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadUploadVideoAuth(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseItem/loadUploadVideoAuth`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateServiceCourseItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseItem/updateServiceCourseItem`, param).then((data) => {
      resolve(data);
    });
  });
}