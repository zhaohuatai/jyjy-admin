import {combineReducers} from 'redux';

function global(state={
  message:{
    messagetype:'success',
    message:'hahhahaa'
  }
},action){
  switch(action.type){
  case 'MESSAGE' : 
    return Object.assign({}, state, {
      message: {messagetype:action.messagetype, message:action.message}
    });
  default:
    return state;
  }
}

function session(state={
  userinfo:{
    username:'Admin',
    status:0,
    sex:'男',
    address: '山东省济南市市中区',
    introduction:'个人说明，非诚勿扰'
  }
},action){
  switch (action.type) {
  case 'LOGIN':
    return Object.assign({}, state, {
      userinfo: action.userinfo
    });
  default:
    break;
  }
  return state;
}

function dashboard(state={
  number:{
    users:1233,
    products:35455,
    orders:1242,
    bank:89000
  }
},action){
  return state;
}

const appReducer = combineReducers({
  global,
  session,
  dashboard
});

export default appReducer;