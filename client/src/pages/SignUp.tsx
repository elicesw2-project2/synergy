import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import 'styles/Users/SignUp.scss';

interface SignUp {
  id: string;
  nickname: string;
  pw: string;
  pwCheck: string;
}

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUp>();

  const onSubmit: SubmitHandler<SignUp> = (data) => {
    fetch('https://circuit-synergy.herokuapp.com/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          alert(result.message);
          navigate('/login');
        } else if (result.status === 400) {
          alert(result.message);
        }
      });
  };

  return (
    <div className="signUp">
      <section className="signUp_container">
        <h1 className="signUp_title">SYNERGY</h1>
        <form className="signUp_info" onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <p>
            <input
              {...register('id', {
                required: '아이디를 입력하세요.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '이메일 형식으로 입력해주세요',
                },
              })}
              placeholder="이메일"
            />
            {errors.id && (
              <div className="login_errors">{errors.id.message}</div>
            )}
          </p>
          <p>
            <input
              {...register('nickname', {
                required: '필수정보 입니다.',
                maxLength: { value: 8, message: '8자 이하로 입력하세요' },
                minLength: { value: 2, message: '2자 이상으로 입력하세요' },
              })}
              placeholder="별명 (최대 8자 이하)"
            />
            {errors.nickname && (
              <div className="login_errors">{errors.nickname.message}</div>
            )}
          </p>
          <p>
            <input
              {...register('pw', {
                required: '비밀번호를 입력하세요.',
                minLength: { value: 5, message: '5자 이상으로 입력하세요' },
              })}
              type="password"
              placeholder="비밀번호 (최소 5자 이상)"
            />
            {errors.pw && (
              <div className="login_errors">{errors.pw.message}</div>
            )}
          </p>
          <p>
            <input
              {...register('pwCheck', {
                required: '비밀번호를 입력하세요.',
                validate: {
                  value: (value) => {
                    const { pw } = getValues();
                    return pw === value || '비밀번호가 일치하지 않습니다.';
                  },
                },
              })}
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
