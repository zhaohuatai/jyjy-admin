import {API_DOMAIN} from '../utils/config';
import {post} from '../utils/request';

export function loadCouponDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/coupon/coupon/loadCouponDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteCoupon(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/coupon/coupon/deleteCoupon`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadCoupon(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/coupon/coupon/loadCoupon`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createCoupon(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}admin/coupon/coupon/createCoupon`, param).then((data) => {
      resolve(data);
    });
  });
}