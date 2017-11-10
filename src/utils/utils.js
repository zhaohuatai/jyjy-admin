import store from '../store';
import {hashHistory} from 'react-router';

export function checkLogin(){
  console.log(store.getState());
//   if(!store.getState().session.userinfo.status){
//     hashHistory.push('/login');
//   }
}
