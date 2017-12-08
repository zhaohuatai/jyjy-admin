import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

/*
 分类
 */
export function loadEvalDefineResultConclusionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/eval/evalDefineResultConclusion/loadEvalDefineResultConclusionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEvalDefineResultConclusion(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/eval/evalDefineResultConclusion/loadEvalDefineResultConclusion`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateEvalDefineResultConclusion(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/eval/evalDefineResultConclusion/updateEvalDefineResultConclusion`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEvalCategoryList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/eval/evalSubjectRecord/loadEvalCategoryList`, param).then((data) => {
      resolve(data);
    });
  });
}