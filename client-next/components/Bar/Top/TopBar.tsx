import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

function TopBar() {
  return (
    <Container>
      <Link href="/login">
        <Logout>로그아웃</Logout>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 30px 0;
  color: white;
  background-color: #f8f9fa;
  h1 {
    font-size: 1.3rem;
  }
`;

const Logout = styled.button`
  font-size: 14px;
  color: white;
  margin-left: auto;
  margin-right: 20px;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: #30b9a7;
`;

export default TopBar;
