export function doMessage(messagetype, message){
  return {
    type:'MESSAGE',
    messagetype,
    message
  };
}

export function doLogin(userinfo){
  return {
    type:'LOGIN',
    userinfo
  };
}