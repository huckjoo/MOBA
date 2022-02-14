import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('패스워드와 패스워드 확인이 일치하지 않습니다.')
    }

    let body = {
      username: Username,
      password: Password,
      name: Name,
      email: Email
    };

    dispatch(registerUser(body)).then(response => {
      console.log(response.payload);
      if (response.payload.success) {
        navigate('/shops');
      } else {
        alert('회원가입에 실패하였습니다.');
      }
    });
  };

  return (
    <div style={
      { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }
    }>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label> 아이디 </label>
        <input type='text' value={Username} onChange={onUsernameHandler} />
        <label> 패스워드 </label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <label> 패스워드 확인 </label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <label> 이름 </label>
        <input type='text' value={Name} onChange={onNameHandler} />
        <label> 이메일 </label>
        <input type='email' value={Email} onChange={onEmailHandler} />
        <br />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}
export default Auth(RegisterPage, 'register')