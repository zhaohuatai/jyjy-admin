import {post} from "../utils/request";
import {API_DOMAIN} from "../utils/config";

/**
 * 系统参数
 */
export function loadDicSysconfigDataSet(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/dic/dicSysconfig/loadDicSysconfigDataSet', params).then(data => {
      resolve(data);
    });
  });
}

export function addDicSysconfig(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/dic/dicSysconfig/addDicSysconfig', params).then(data => {
      resolve(data);
    });
  })
}

export function updateDicSysconfig(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/dic/dicSysconfig/updateDicSysconfig', params).then(data => {
      resolve(data);
    });
  })
}

export function loadDicSysconfig(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/dic/dicSysconfig/loadDicSysconfig', params).then(data => {
      resolve(data);
    });
  })
}

export function deletDicSysconfig(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/dic/dicSysconfig/deleteDicSysconfig', params).then(data => {
      resolve(data);
    });
  })
}


/**
 * 系统参数
 */
export function loadPubPartnerDataSet(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/pub/pubPartner/loadPubPartnerDataSet', params).then(data => {
      resolve(data);
    });
  })
}

export function createPubPartner(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/pub/pubPartner/addPubPartner', params).then(data => {
      resolve(data);
    });
  })
}

export function updatePubPartner(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/pub/pubPartner/updatePubPartner', params).then(data => {
      resolve(data);
    });
  })
}

export function loadPubPartner(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/pub/pubPartner/loadPubPartner', params).then(data => {
      resolve(data);
    });
  })
}

export function deletePubPartner(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/pub/pubPartner/deletePubPartner', params).then(data => {
      resolve(data);
    });
  })
}

export function uploadLogo(params) {
  return new Promise((resolve) => {
    post(API_DOMAIN + 'admin/pub/pubPartner/uploadLogo', params).then(data => {
      resolve(data);
    });
  })
}

