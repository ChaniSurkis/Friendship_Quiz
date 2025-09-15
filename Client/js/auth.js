function getUserFromToken(){
      const token = localStorage.getItem('token');
    if(token){
        const decoded=jwt_decode(token);
       return decoded;
    }
    return null;
}
function getFriendFromToken(){
      const token = localStorage.getItem('friendToken');
    if(token){
        const decoded=jwt_decode(token);
       return decoded;
    }
    return null;
}