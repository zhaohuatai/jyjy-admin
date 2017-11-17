import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';


export function loadServiceCourseCategory(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourseCategory/loadServiceCourseCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/course/serviceCourse/loadServiceCourseDataSet`, param).then((data) => {
      const rows = data.data.dataSet.rows;
      new Promise((resolve) => {
        for (let i = 0; i < rows.length; i++) {
          loadServiceCourseCategory({id: rows[i].categoryId}).then(d => {
            data.data.dataSet.rows[i].categoryName = d.data.serviceCourseCategory.categoryName
          })
        }
        resolve();
      }).then(() => {
        resolve(data);
      })
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

export function loadDataCareerCategoryDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataCareerCategory/loadDataCareerCategoryDataSet`, param).then((data) => {
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
