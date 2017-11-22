import {post, postImg} from '../utils/request';
import {API_DOMAIN} from '../utils/config';


//profession

export function loadDataProfession(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/loadDataProfession`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataProfessionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/loadDataProfessionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataProfession(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/deleteDataProfession`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataProfession(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/createDataProfession`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataProfession(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/updateDataProfession`, param).then((data) => {
      resolve(data);
    });
  });
}

//ProfessionSubject
export function loadDataProfessionSubject(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/loadDataProfessionSubject`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataProfessionSubjectDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/loadDataProfessionSubjectDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataProfessionSubject(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/deleteDataProfessionSubject`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataProfessionSubject(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/createDataProfessionSubject`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataProfessionSubject(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/updateDataProfessionSubject`, param).then((data) => {
      resolve(data);
    });
  });
}

//ProfessionCategory
export function loadDataProfessionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/loadDataProfessionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataProfessionCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/loadDataProfessionCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataProfessionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/deleteDataProfessionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataProfessionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/createDataProfessionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataProfessionCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataProfession/updateDataProfessionCategory`, param).then((data) => {
      resolve(data);
    });
  });
}

//university
export function loadDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/loadDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

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

export function createDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/createDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataUniversity/updateDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

export function uploadBadge(param) {
  return new Promise((resolve, reject) => {
    postImg(`${API_DOMAIN}admin/data/dataUniversity/uploadBadge`, param).then((data) => {
      resolve(data);
    });
  });
}

//scoreLine


export function loadDataScoreLineDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/loadDataScoreLineDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/loadDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/deleteDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/createDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataScoreLine(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLine/updateDataScoreLine`, param).then((data) => {
      resolve(data);
    });
  });
}

//省

export function loadDataScoreLineProvinceDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/loadDataScoreLineProvinceDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/loadDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/deleteDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/createDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateDataScoreLineProvince(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/data/dataScoreLineProvince/updateDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}

//career


export function loadDataCareerDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareer/loadDataCareerDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataCareer(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareer/loadDataCareer`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteDataCareer(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareer/deleteDataCareer`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataCareerCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareerCategory/loadDataCareerCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createDataCareer(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/data/dataCareer/createDataCareer`, param).then((data) => {
      resolve(data);
    });
  });
}