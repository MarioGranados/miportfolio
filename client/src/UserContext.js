import React, { useEffect, useState } from 'react'

export default function UserContext() {
    const [user,setUserInfo] = useState({})
    useEffect(() => {
      fetch('http://localhost:4000/profile', {
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
    }, []);
  return (
    <div>
        {user.username == null ? null : user.username}
    </div>
  )
}
