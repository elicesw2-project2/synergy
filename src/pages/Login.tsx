import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import 'styles/Users/Login.scss';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="login">
      <section className="login_container">
        <h1 className="login_title">SYNERGY</h1>
        <form
          className="login_info"
          onSubmit={handleSubmit(() => console.log('asdf'))}
        >
          <hr />
          <div>
            <input
              type="text"
              {...register('id', { required: '아이디를 입력하세요.' })}
              placeholder="이메일"
            />
            {errors.id && (
              <div className="login_errors">{errors.id.message}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register('pw', { required: '비밀번호를 입력하세요.' })}
              placeholder="비밀번호"
            />
            {errors.pw && (
              <div className="login_errors">{errors.pw.message}</div>
            )}
          </div>
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
