import React from 'react';
import { Link } from 'react-router-dom';

import 'styles/Users/SignUp.scss';

function SignUp() {
  return (
    <div className="signUp">
      <section className="signUp_container">
        <h1 className="signUp_title">SYNERGY</h1>
        <form className="signUp_info">
          <hr />
          <p>
            <input placeholder="이메일" />
          </p>
          <p>
            <input placeholder="별명 (최대 8자 이하)" />
          </p>
          <p>
            <input type="password" placeholder="비밀번호 (최소 5자 이상)" />
          </p>
          <p>
            <input type="password" placeholder="비밀번호 확인" />
          </p>
          <p>
            <button type="submit">회원가입</button>
          </p>
        </form>
        <div className="login_link">
          <span>이미 계정이 있으신가요?</span>
          <span>
            <Link to="/Login">로그인하기</Link>
          </span>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
