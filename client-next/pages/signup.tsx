import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

type FormValues = {
  id: string;
  nickname: string;
  pw: string;
  pwCheck: string;
};

const Signup: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch('https://circuit-synergy.herokuapp.com/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          alert(result.message);
          router.push('/login');
        } else if (result.status === 400) {
          alert(result.message);
        }
      });
  };
  return (
    <SignUpContainer>
      <Container>
        <Title>SYNERGY</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <div>
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
            <Error>{errors.id?.message}</Error>
          </div>
          <div>
            <input
              {...register('nickname', {
                required: '필수정보 입니다.',
                maxLength: { value: 8, message: '8자 이하로 입력하세요' },
                minLength: { value: 2, message: '2자 이상으로 입력하세요' },
              })}
              placeholder="별명 (최대 8자 이하)"
            />
            <Error>{errors.nickname?.message}</Error>
          </div>
          <div>
            <input
              {...register('pw', {
                required: '비밀번호를 입력하세요.',
                minLength: { value: 5, message: '5자 이상으로 입력하세요' },
              })}
              type="password"
              placeholder="비밀번호 (최소 5자 이상)"
            />
            <Error>{errors.pw?.message}</Error>
          </div>
          <div>
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
            <Error>{errors.pwCheck?.message}</Error>
          </div>
          <div>
            <button type="submit">회원가입</button>
          </div>
        </Form>
        <Login>
          <span>이미 계정이 있으신가요?</span>
          <span>
            <Link href="/login">로그인하기</Link>
          </span>
        </Login>
      </Container>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 400px;
`;
const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  hr {
    border: 1px solid black;
    margin: 10px 0 10px 0;
    width: 100%;
  }

  input {
    border: 1px solid black;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    line-height: 50px;
    padding-left: 20px;
    margin-top: 20px;
    font-size: 18px;
    box-sizing: border-box;
  }
  button {
    background-color: #f0f0f0;
    border: 1px solid transparent;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    font-size: 18px;
    cursor: pointer;
  }
`;
const Error = styled.div`
  position: absolute;
  font-size: 14px;
`;

const Login = styled.div`
  margin-top: 20px;

  a {
    font-style: normal;
    font-size: 16px;
    font-weight: 600;
    text-decoration-line: none;
  }
`;

export default Signup;
