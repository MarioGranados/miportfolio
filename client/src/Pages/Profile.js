import React, {useState, useEffect} from 'react'
import { API_URL } from '../Config/Confg';

export default function Profile() {
    const [user,setUserInfo] = useState({})
    useEffect(() => {
      fetch(`${API_URL}/profile`, {
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
    }, []);
  return (
    <>
        Welcome {user.username == null ? 'null' : user.username + ' '} glad to have you back {user.username == null ? 'null' : ' ' + user.firstName + ' ' + user.lastName}
    </>
  )
}
