import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import styles from './RegisterPage.module.css';
import Header from '../../header/Header';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('패스워드와 패스워드 확인이 일치하지 않습니다.');
    }

    let body = {
      username: Username,
      password: Password,
      name: Name,
      email: Email,
    };

    dispatch(registerUser(body)).then((response) => {
      console.log(response.payload);
      if (response.payload.success) {
        navigate('/main');
      } else {
        alert('회원가입에 실패하였습니다.');
      }
    });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.loginContents}>
            <div className={styles.loginText}>
              <span>회원가입</span>
            </div>
            <form className={styles.loginForm} onSubmit={onSubmitHandler}>
              <input
                className={styles.inputs}
                type="text"
                value={Username}
                onChange={onUsernameHandler}
                placeholder="아이디"
              />
              <input
                className={styles.inputs}
                type="password"
                value={Password}
                onChange={onPasswordHandler}
                placeholder="비밀번호(5글자 이상)"
              />
              <input
                className={styles.inputs}
                type="password"
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
                placeholder="비밀번호 확인"
              />
              <input
                className={styles.inputs}
                type="text"
                value={Name}
                onChange={onNameHandler}
                placeholder="이름"
              />
              <input
                className={styles.inputs}
                type="email"
                value={Email}
                onChange={onEmailHandler}
                placeholder="이메일 주소"
              />
              <button className={styles.buttons} type="submit">
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Auth(RegisterPage, 'register');
