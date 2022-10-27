import React from "react";


const UserInfo = (props) => {
  return (
    <div className='userinfo'>
      <h2 className='userinfo-title'>Account Information</h2>
      <p className='userinfo-username-title'>Username:</p>
      <p className='userinfo-username'>{props.userName}</p>
      <p className='userinfo-email-title'>Email:</p>
      <p className='userinfo-email'>xxx@gmail.com</p>

    </div>
  );
}

export default UserInfo;