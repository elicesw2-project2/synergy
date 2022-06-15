import React from 'react';
import { Link } from 'react-router-dom';

import 'styles/Users/Login.scss';

function Login() {
  return (
    <div className="login">
      <section className="login_container">
        <h1 className="login_title">SYNERGY</h1>
        <form className="login_info">
          <hr />
          <p>
            <input type="text" placeholder="이메일" />
          </p>
          <p>
            <input type="password" placeholder="비밀번호" />
          </p>
          <p>
            <button type="submit">로그인</button>
          </p>
        </form>
        <div className="singUp_link">
          <span>계정이 없으신가요?</span>
          <span>
            <Link to="/SignUp">가입하기</Link>
          </span>
        </div>
      </section>
    </div>
  );
}

export default Login;
