import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';

export function loadColumnChannelDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/loadColumnChannelDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/deleteColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/createColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/loadColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateColumnChannel(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/updateColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function uploadColumnAttachment(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/uploadAttachment`, param).then((data) => {
      resolve(data);
    });
  });
}

export function uploadColumnCover(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannel/uploadCover`, param).then((data) => {
      resolve(data);
    });
  });
}

//item

export function loadColumnChannelItemDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannelItem/loadColumnChannelItemDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteColumnChannelItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannelItem/deleteColumnChannelItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createColumnChannelItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannelItem/createColumnChannelItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadColumnChannelItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannelItem/loadColumnChannelItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateColumnChannelItem(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannelItem/updateColumnChannelItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function uploadColumnItemAttachment(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannelItem/uploadAttachment`, param).then((data) => {
      resolve(data);
    });
  });
}

export function uploadColumnItemCover(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/channel/columnChannelItem/uploadCover`, param).then((data) => {
      resolve(data);
    });
  });
}
