import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import 'styles/Users/SignUp.scss';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="signUp">
      <section className="signUp_container">
        <h1 className="signUp_title">SYNERGY</h1>
        <form
          className="signUp_info"
          onSubmit={handleSubmit(() => console.log('asdf'))}
        >
          <hr />
          <p>
            <input
              {...register('id', { required: '아이디를 입력하세요.' })}
              placeholder="이메일"
            />
            {errors.id && (
              <div className="login_errors">{errors.id.message}</div>
            )}
          </p>
          <p>
            <input
              {...register('nickname', { required: '필수정보 입니다.' })}
              placeholder="별명 (최대 8자 이하)"
            />
            {errors.nickname && (
              <div className="login_errors">{errors.nickname.message}</div>
            )}
          </p>
          <p>
            <input
              {...register('pw', { required: '아이디를 입력하세요.' })}
              type="password"
              placeholder="비밀번호 (최소 5자 이상)"
            />
            {errors.pw && (
              <div className="login_errors">{errors.pw.message}</div>
            )}
          </p>
          <p>
            <input
              {...register('pwCheck', { required: '아이디를 입력하세요.' })}
              type="password"
              placeholder="비밀번호 확인"
            />
            {errors.pwCheck && (
              <div className="login_errors">{errors.pwCheck.message}</div>
            )}
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
