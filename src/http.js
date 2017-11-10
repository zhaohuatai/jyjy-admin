import 'whatwg-fetch';
import {hashHistory} from 'react-router';
import store from './store';
import {doMessage} from './action';
import {API_DOMAIN} from './config';
import { message } from 'antd';

/**
 * 状态码错误名称
 * @param {int} statusCode
 */
function checkCode(statusCode,message){
  if(statusCode == 200){
    return {code:statusCode, message:''};
  }else{
    //返回码判断
    switch(statusCode){
    case 300 : return {code:statusCode, message:message};
    case 401 : return {code:statusCode, message:message};
    case 301 : hashHistory.push('/login');break;
    case 500 : return {code:statusCode, message:message};
    default : return {code:statusCode, message:message};
    }
  }
}

let Http = {};
/**
 * fetch.get请求封装
 */
Http.get = (url,params='')=>{
  if (params) {
    let paramsArray = [];
    //encodeURIComponent
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&');
    } else {
      url += '&' + paramsArray.join('&');
    }
  }

  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'get',
    }).then((response) => {
      response.json();})
      .then((responseData) => {
        let checkCodeResult = checkCode(responseData.statusCode);
        if(checkCodeResult.code == 200){
          resolve(responseData);
        }else{
          //触发store action 弹出提示框
          message.warning(checkCodeResult.message);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

};

/**
 * fetch.post请求封装
 */
Http.post = (url,params='')=>{

  //json 序列化
  if (params) {
    var paramsArray = [];
    //encodeURIComponent
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));

    var paramsurl = '';
    paramsurl += paramsArray.join('&');

  }

  return new Promise(function (resolve, reject) {
    fetch( url, {
      method: 'post',
      body:paramsurl,
      mode:'cors',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((response) => {
      return response.json();
    }).then((responseData) => {

      let checkCodeResult = checkCode(responseData.statusCode,responseData.message);
      if(checkCodeResult.code != 200){
        //触发store action 弹出提示框
        if(checkCodeResult.message){
          message.warning(checkCodeResult.message);
        }
      }
      resolve(responseData);
    })
      .catch((err) => {
        reject(err);
      });
  });
};


//获取登录验证码
export function getCaptcha(getDate){
  fetch(API_DOMAIN+'api/auth/captcha',{
    method:'get',
    mode:'no-cors',
  }).then(response=>{
    response.json();
  })
    .then(responseData=>{
      getDate(responseData);
    });
}

//web登录
export function doWebLogin(paramsArray, getDate){

  const formBody = Object.keys(paramsArray).map(key=>encodeURIComponent(key)+'='+encodeURIComponent(paramsArray[key])) .join('&');

  // let = 'username=buyer1&password=4b633e6c440f32152859d2a424f1e5df&captcha=1111&loginOrgin=PC'
  var headers = new Headers();
  //headers.set('Accept', 'application/json');
  headers.set('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
  headers.set('X-Requested-With','XMLHttpRequest');

  fetch(API_DOMAIN+'api/auth/login',{
    method:'post',
    mode:'cors',
    credentials: 'include',
    headers,
    body: formBody
  }).then((response)=>{
    return response.json();
  }).then((responseData)=>{
    getDate(responseData);
  });
}


//获取导航菜单
export function loadCategoryTree(getData){
  Http.post(API_DOMAIN+'auth/loadMenu?appkey=APP_ROOT').then((data)=>{
    getData(data);
  });
}

/**
 *  权限管理
 */

//菜单
export function loadAuthMenuList(params,getData){
  Http.post(API_DOMAIN+'auth/authMenu/loadAuthMenuList?appkey=APP_ROOT',params).then((data)=>{
    getData(data);
  });
}
export function addAuthMenu(getData){
  Http.post(API_DOMAIN+'auth/authMenu/addAuthMenu?appkey=APP_ROOT').then((data)=>{
    getData(data);
  });
}

export function loadAuthMenu(getData){
  Http.post(API_DOMAIN+'auth/authMenu/loadAuthMenu?appkey=APP_ROOT').then((data)=>{
    getData(data);
  });
}

export function updateAuthMenu(getData){
  Http.post(API_DOMAIN+'auth/authMenu/updateAuthMenu?appkey=APP_ROOT').then((data)=>{
    getData(data);
  });
}

export function setAuthMenuEnabled(getData){
  Http.post(API_DOMAIN+'auth/authMenu/setAuthMenuEnabled?appkey=APP_ROOT').then((data)=>{
    getData(data);
  });
}

export function removeAuthMenu(getData){
  Http.post(API_DOMAIN+'auth/authMenu/removeAuthMenu?appkey=APP_ROOT').then((data)=>{
    getData(data);
  });
}

export function loadAuthMenuTree(getData){
  Http.post(API_DOMAIN+'auth/authMenu/loadAuthMenuTree?appkey=APP_ROOT').then((data)=>{
    getData(data);
  });
}

//app
export function loadAuthAppList(params,getData){
  Http.post(API_DOMAIN+'auth/authApp/loadAuthAppList',params).then((data)=>{
    getData(data);
  });
}
export function loadAuthAppComboboVo(params,getData){
  Http.post(API_DOMAIN+'auth/authApp/loadAuthAppList',params).then((data)=>{
    getData(data);
  });
}
export function deletAuthApp(params,getData){
  Http.post(API_DOMAIN+'auth/authApp/loadAuthAppList',params).then((data)=>{
    getData(data);
  });
}
export function setAuthAppEnabled(params,getData){
  Http.post(API_DOMAIN+'auth/authApp/loadAuthAppList',params).then((data)=>{
    getData(data);
  });
}
export function updateAuthApp(params,getData){
  Http.post(API_DOMAIN+'auth/authApp/loadAuthAppList',params).then((data)=>{
    getData(data);
  });
}
export function addAuthApp(params,getData){
  Http.post(API_DOMAIN+'auth/authApp/loadAuthAppList',params).then((data)=>{
    getData(data);
  });
}
export function loadAuthApp(params,getData){
  Http.post(API_DOMAIN+'auth/authApp/loadAuthAppList',params).then((data)=>{
    getData(data);
  });
}

//Permission
export function loadAuthPermissionList(params,getData){
  Http.post(API_DOMAIN+'auth/authPermission/loadAuthPermissionList?appkey=APP_ROOT',params).then((data)=>{
    getData(data);
  });
}
export function addPermission(params,getData){
  Http.post(API_DOMAIN+'auth/authPermission/addPermission',params).then((data)=>{
    getData(data);
  });
}
export function loadForUpdate(params,getData){
  Http.post(API_DOMAIN+'auth/authPermission/loadForUpdate',params).then((data)=>{
    getData(data);
  });
}
export function updatePermission(params,getData){
  Http.post(API_DOMAIN+'auth/authPermission/updatePermission',params).then((data)=>{
    getData(data);
  });
}
export function setPermissionEnabled(params,getData){
  Http.post(API_DOMAIN+'auth/authPermission/setPermissionEnabled',params).then((data)=>{
    getData(data);
  });
}
export function deletAuthPermission(params,getData){
  Http.post(API_DOMAIN+'auth/authPermission/deletAuthPermission',params).then((data)=>{
    getData(data);
  });
}
export function batchDeleteAuthPermission(params,getData){
  Http.post(API_DOMAIN+'auth/authPermission/batchDeleteAuthPermission',params).then((data)=>{
    getData(data);
  });
}

//role
export function loadAuthRoleList(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/loadAuthRoleList',params).then((data)=>{
    getData(data);
  });
}
export function addRole(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/addRole',params).then((data)=>{
    getData(data);
  });
}
export function loadRole(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/loadRole',params).then((data)=>{
    getData(data);
  });
}
export function updateRole(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/updateRole',params).then((data)=>{
    getData(data);
  });
}
export function deletAuthRole(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/deletAuthRole',params).then((data)=>{
    getData(data);
  });
}
export function setAuthRoleEnabled(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/setAuthRoleEnabled',params).then((data)=>{
    getData(data);
  });
}
export function loadRoleComboboVo(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/loadRoleComboboVo',params).then((data)=>{
    getData(data);
  });
}
export function loadPermDataSetForRoleAssign(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/loadPermDataSetForRoleAssign',params).then((data)=>{
    getData(data);
  });
}
export function removePermsFromRole(params,getData){
  Http.post(API_DOMAIN+'auth/authRole/removePermsFromRole',params).then((data)=>{
    getData(data);
  });
}
export function addPermsToRole(params,getData){
  let url = 'auth/authRole/addPermsToRole?';

  let len = params.permIds.length;
  for(let i=0; i<len; i++){
    let temp = 'permIds[]='+params.permIds[i]+'&';
    url+=temp;
  }

  url += 'roleId='+params.roleId;
  Http.post(API_DOMAIN+url).then((data)=>{
    getData(data);
  });
}

//user
export function loadAuthUserList(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/loadAuthUserList',params).then((data)=>{
    getData(data);
  });
}
export function loadUpdateData(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/loadUpdateData',params).then((data)=>{
    getData(data);
  });
}
export function updateUser(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/updateUser',params).then((data)=>{
    getData(data);
  });
}
export function setUserStatus(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/setUserStatus',params).then((data)=>{
    getData(data);
  });
}
export function createUser(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/createUser',params).then((data)=>{
    getData(data);
  });
}
export function loadRoleDataSetForUserAssign(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/loadRoleDataSetForUserAssign',params).then((data)=>{
    getData(data);
  });
}
export function addRolesToUser(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/addRolesToUser',params).then((data)=>{
    getData(data);
  });
}
export function removeRoleFromUser(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/removeRoleFromUser',params).then((data)=>{
    getData(data);
  });
}
export function loadPermDataSetForUserAssign(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/loadPermDataSetForUserAssign',params).then((data)=>{
    getData(data);
  });
}
export function addPremsToUser(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/addPremsToUser',params).then((data)=>{
    getData(data);
  });
}
export function removePremsFromUser(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/loadAuthUserList',params).then((data)=>{
    getData(data);
  });
}

export function createAccount(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/createAccount',params).then((data)=>{
    getData(data);
  });
}

export function changePwd(params,getData){
  Http.post(API_DOMAIN+'auth/authUser/changePwd',params).then((data)=>{
    getData(data);
  });
}
/**
 * order
 */
//订单列表
export function loadOrdersDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/orders/loadOrdersDataSet',params).then((data)=>{
    getData(data);
  });
}

export function loadSumPayFee(params,getData){
  Http.post(API_DOMAIN+'admin/orders/loadSumPayFee',params).then((data)=>{
    getData(data);
  });
}

export function loadOrdersDetails(params,getData){
  Http.post(API_DOMAIN+'admin/orders/loadOrdersDetails',params).then((data)=>{
    getData(data);
  });
}

//确认收货
export function confirmReceipt(params, getDate){
  Http.post(API_DOMAIN+'admin/orders/confirmReceipt',params).then(data=>{
    getDate(data);
  });
}

//设置订单状态
export function setOrdersStatus(params, getDate){
  Http.post(API_DOMAIN+'admin/orders/setOrdersStatus',params).then(data=>{
    if(data.statusCode == 200){
      message.success('设置成功');
    }
    getDate(data);
  });
}

export function loadOrdersListCount(params,getData){
  Http.post(API_DOMAIN+'admin/orders/loadOrdersListCount',params).then((data)=>{
    getData(data);
  });
}

/**
 * 商品
 */

//商品列表
export function loadProduct(params,getData){
  Http.post(API_DOMAIN+'admin/product/product/loadProduct',params).then((data)=>{
    getData(data);
  });
}

//商品列表
export function setProductStatus(params,getData){
  Http.post(API_DOMAIN+'admin/product/product/setProductStatus',params).then((data)=>{
    getData(data);
  });
}

//商品数
export function loadProductListCount(params,getData){
  Http.post(API_DOMAIN+'admin/product/product/loadProductListCount',params).then((data)=>{
    getData(data);
  });
}

//商品热销设置
export function setProductIsHot(params,getData){
  Http.post(API_DOMAIN+'admin/product/product/setProductIsHot',params).then((data)=>{
    getData(data);
  });
}

//审核商品 5不通过  6通过
export function checkProduct(params,getData){
  Http.post(API_DOMAIN+'admin/product/product/checkProduct',params).then((data)=>{
    getData(data);
  });
}

//商品下架
export function setProductOffShelf(params,getData){
  Http.post(API_DOMAIN+'admin/product/product/setProductOffShelf',params).then((data)=>{
    getData(data);
  });
}

export function loadProductDetail(params,getData){
  Http.post(API_DOMAIN+'admin/product/product/loadProductDetail',params).then((data)=>{
    getData(data);
  });
}

/**
 * 用户
 */
export function loadMemberDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/member/loadMemberDataSet',params).then((data)=>{
    getData(data);
  });
}

export function setMemberStatus(params,getData){
  Http.post(API_DOMAIN+'admin/member/setMemberStatus',params).then((data)=>{
    getData(data);
  });
}

export function loadMemberCount(params,getData){
  Http.post(API_DOMAIN+'admin/member/loadMemberCount',params).then((data)=>{
    getData(data);
  });
}

export function loadMember(params,getData){
  Http.post(API_DOMAIN+'admin/member/loadMember',params).then((data)=>{
    getData(data);
  });
}

//商品保证金
export function loadMemberAccountDepositDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountDeposit/loadMemberAccountDepositDataSet',params).then((data)=>{
    getData(data);
  });
}

export function loadMemberAccountDeposit(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountDeposit/loadMemberAccountDeposit',params).then((data)=>{
    getData(data);
  });
}

//推广
export function loadMemberAccountIntroDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountIntro/loadMemberAccountIntroDataSet',params).then((data)=>{
    getData(data);
  });
}

export function loadMemberAccountIntro(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountIntro/loadMemberAccountIntro',params).then((data)=>{
    getData(data);
  });
}

//交易记录
export function loadMemberAccountLogDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountLog/loadMemberAccountLogDataSet',params).then((data)=>{
    getData(data);
  });
}

export function loadMemberAccountLog(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountLog/loadMemberAccountLog',params).then((data)=>{
    getData(data);
  });
}

//充值记录
export function loadMemberAccountRechargeDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountRecharge/loadMemberAccountRechargeDataSet',params).then((data)=>{
    getData(data);
  });
}

export function loadMemberAccountRecharge(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountRecharge/loadMemberAccountRecharge',params).then((data)=>{
    getData(data);
  });
}

export function deletMemberAccountRecharge(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountRecharge/deletMemberAccountRecharge',params).then((data)=>{
    getData(data);
  });
}

//体现
export function loadMemberAccountWithdrawDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountWithdrawCash/loadMemberAccountWithdrawDataSet',params).then((data)=>{
    getData(data);
  });
}

export function loadMemberAccountWithdrawCash(params,getData){
  Http.post(API_DOMAIN+'admin/member/memberAccountWithdrawCash/loadMemberAccountWithdrawCash',params).then((data)=>{
    getData(data);
  });
}


/**
 * 文章
 */
export function loadPubArticleImageDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/pub/pubArticleImage/loadPubArticleImageDataSet',params).then((data)=>{
    getData(data);
  });
}

// export function createPubArticleImage(params,getData){
//   Http.post(API_DOMAIN+'admin/pub/pubArticleImage/createPubArticleImage',params).then((data)=>{
//     getData(data);
//   });
// }
export function createPubArticleImage(params, getDate){
    let headers = new Headers();
    //headers.set('Content-Type','multipart/form-data; boundary=----WebKitFormBoundary4I9QTerA7b4BBalV');
    headers.set('X-Requested-With','XMLHttpRequest');

    fetch(API_DOMAIN+'admin/pub/pubArticleImage/createPubArticleImage',{
        method:'post',
        mode:'cors',
        credentials: 'include',
        headers,
        body:params
    }).then((response)=>{
        return response.json();
    }).then((responseData)=>{
        getDate(responseData);
    }).catch(()=>{
        getDate({codeStatus:400});
    });
}

export function loadPubArticleImage(params,getData){
  Http.post(API_DOMAIN+'admin/pub/pubArticleImage/loadPubArticleImage',params).then((data)=>{
    getData(data);
  });
}

export function deletePubArticleImage(params,getData){
  Http.post(API_DOMAIN+'admin/pub/pubArticleImage/deletePubArticleImage',params).then((data)=>{
    getData(data);
  });
}


/**
 * 广告
 */
export function loadProductAdvDataSet(params,getData){
  Http.post(API_DOMAIN+'admin/product/productAdv/loadProductAdvDataSet',params).then((data)=>{
    getData(data);
  });
}
export function addProductAdv(params,getData){
  Http.post(API_DOMAIN+'admin/product/productAdv/createProductAdv',params).then((data)=>{
    getData(data);
  });
}
export function loadProductAdv(params,getData){
  Http.post(API_DOMAIN+'admin/product/productAdv/loadProductAdv',params).then((data)=>{
    getData(data);
  });
}

export function uploadProductAdvImage(params, getDate){
    let headers = new Headers();
    //headers.set('Content-Type','multipart/form-data; boundary=----WebKitFormBoundary4I9QTerA7b4BBalV');
    headers.set('X-Requested-With','XMLHttpRequest');

    fetch(API_DOMAIN+'admin/product/productAdv/uploadProductAdvImage',{
        method:'post',
        mode:'cors',
        credentials: 'include',
        headers,
        body:params
    }).then((response)=>{
        return response.json();
    }).then((responseData)=>{
        getDate(responseData);
    }).catch(()=>{
        getDate({codeStatus:400});
    });
}

export function deleteProductAdv(params,getData){
  Http.post(API_DOMAIN+'admin/product/productAdv/deleteProductAdv',params).then((data)=>{
    getData(data);
  });
}
export function setProductAdvIsShow(params,getData){
  Http.post(API_DOMAIN+'admin/product/productAdv/setProductAdvIsShow',params).then((data)=>{
    getData(data);
  });
}

/**
 * specification
 */
export function loadSpecificationDataSet(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/loadSpecificationDataSet',params).then(data=>{
    getDate(data);
  });
}

export function createSpecification(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/createSpecification',params).then(data=>{
    getDate(data);
  });
}

export function loadSpecification(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/loadSpecification',params).then(data=>{
    getDate(data);
  });
}

export function updateSpecification(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/updateSpecification',params).then(data=>{
    getDate(data);
  });
}

export function deleteSpecification(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/deleteSpecification',params).then(data=>{
    getDate(data);
  });
}

export function disableSpecificationStatus(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/loadSpecificationDataSet',params).then(data=>{
    getDate(data);
  });
}

export function enableSpecificationStatus(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/enableSpecificationStatus',params).then(data=>{
    getDate(data);
  });
}

export function auditNoSpecificationStatus(params, getDate){
  Http.post( API_DOMAIN+'admin/specification/auditNoSpecificationStatus',params).then(data=>{
    getDate(data);
  });
}

/**
 * 系统参数
 */
export function loadDicSysconfigDataSet(params, getDate){
  Http.post( API_DOMAIN+'admin/dic/dicSysconfig/loadDicSysconfigDataSet',params).then(data=>{
    getDate(data);
  });
}

export function addDicSysconfig(params, getDate){
  Http.post( API_DOMAIN+'admin/dic/dicSysconfig/addDicSysconfig',params).then(data=>{
    getDate(data);
  });
}

export function updateDicSysconfig(params, getDate){
  Http.post( API_DOMAIN+'admin/dic/dicSysconfig/updateDicSysconfig',params).then(data=>{
    getDate(data);
  });
}

export function loadDicSysconfig(params, getDate){
  Http.post( API_DOMAIN+'admin/dic/dicSysconfig/loadDicSysconfig',params).then(data=>{
    getDate(data);
  });
}

export function deletDicSysconfig(params, getDate){
  Http.post( API_DOMAIN+'admin/dic/dicSysconfig/deletDicSysconfig',params).then(data=>{
    getDate(data);
  });
}

/**
 * catergory
 */
export function createCategory(params, getDate){
  Http.post( API_DOMAIN+'admin/category/createCategory',params).then(data=>{
    getDate(data);
  });
}

export function deleteCategory(params, getDate){
  Http.post( API_DOMAIN+'admin/category/deleteCategory',params).then(data=>{
    getDate(data);
  });
}
export function enableCategoryAttr(params, getDate){
  Http.post( API_DOMAIN+'admin/category/enableCategoryAttr',params).then(data=>{
    getDate(data);
  });
}
export function disableCategory(params, getDate){
  Http.post( API_DOMAIN+'admin/category/disableCategory',params).then(data=>{
    getDate(data);
  });
}

export function updateCategoryOrderNum(params, getDate){
  Http.post( API_DOMAIN+'admin/category/updateCategoryOrderNum',params).then(data=>{
    getDate(data);
  });
}
export function loadProductCategoryTree(params, getDate){
  Http.post( API_DOMAIN+'admin/category/loadCategoryTree',params).then(data=>{
    getDate(data);
  });
}

export function loadCategory(params, getDate){
  Http.post( API_DOMAIN+'admin/category/loadCategory',params).then(data=>{
    getDate(data);
  });
}

/*
Term
*/
export function loadPubTermDataSet(params, getDate){
  Http.post( API_DOMAIN+'admin/pub/pubTerm/loadPubTermDataSet',params).then(data=>{
    getDate(data);
  });
}

export function createPubTerm(params, getDate){
  Http.post( API_DOMAIN+'admin/pub/pubTerm/createPubTerm',params).then(data=>{
    getDate(data);
  });
}

export function updatePubTerm(params, getDate){
  Http.post( API_DOMAIN+'admin/pub/pubTerm/updatePubTerm',params).then(data=>{
    getDate(data);
  });
}

export function deletePubTerm(params, getDate){
  Http.post( API_DOMAIN+'admin/pub/pubTerm/deletePubTerm',params).then(data=>{
    getDate(data);
  });
}

export function loadPubTerm(params, getDate){
  Http.post( API_DOMAIN+'admin/pub/pubTerm/loadPubTerm',params).then(data=>{
    getDate(data);
  });
}
