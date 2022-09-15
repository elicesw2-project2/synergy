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
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export default Home;
