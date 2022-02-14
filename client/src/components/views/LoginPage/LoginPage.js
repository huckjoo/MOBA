import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value)
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      username: Username,
      password: Password
    };

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        navigate('/shops');
      } else {
        alert('아이디와 비밀번호를 확인해주세요.')
      }
    });
  };

  return (
    <div style={
      { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }
    }>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label> 아이디 </label>
        <input type='username' value={Username} onChange={onUsernameHandler} />
        <label> 패스워드 </label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>로그인</button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, 'login');