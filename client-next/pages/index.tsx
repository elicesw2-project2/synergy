import React from 'react';
import type { NextPage } from 'next';
import AppLayout from '../components/AppLayout';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Container>Home</Container>
    </AppLayout>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #343a40;
`;
export default Home;
