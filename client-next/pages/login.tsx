import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

type FormValues = {
  id: string;
  pw: string;
};

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    console.log(data);
    fetch('https://circuit-synergy.herokuapp.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === '로그인 성공') {
          router.push('/');
          localStorage.setItem('id', result.data.id);
          localStorage.setItem('TOKEN', result.data.token);
        } else {
          alert('아이디나 비밀번호를 바르게 입력해주세요.');
        }
      });
  };
  return (
    <LoginContainer>
      <Container>
        <Title>SYNERGY</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <div>
            <input
              type="text"
              {...register('id', { required: '아이디를 입력하세요.' })}
              placeholder="이메일"
            />
            <Error>{errors.id?.message}</Error>
          </div>
          <div>
            <input
              type="password"
              {...register('pw', { required: '비밀번호를 입력하세요.' })}
              placeholder="비밀번호"
            />
            <Error>{errors.pw?.message}</Error>
          </div>
          <p>
            <button type="submit">로그인</button>
          </p>
        </Form>
        <SignUp>
          <span>계정이 없으신가요?</span>
          <span>
            <Link href="/signup">가입하기</Link>
          </span>
        </SignUp>
      </Container>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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

const SignUp = styled.div`
  margin-top: 20px;

  a {
    font-style: normal;
    font-size: 16px;
    font-weight: 600;
    text-decoration-line: none;
  }
`;

export default Login;
