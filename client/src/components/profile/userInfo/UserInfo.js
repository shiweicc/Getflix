import React from "react";


const UserInfo = (props) => {
  return (
    <div className='userinfo'>
      <h2 className='userinfo-title'>User Information</h2>
      <p className='userinfo-username'>User name: <em>{props.userName}</em></p>
      <p className='userinfo-email'>User email: <em>xxx</em></p>

    </div>
  );
}

export default UserInfo;