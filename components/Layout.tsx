'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.main`
  position: relative;
  z-index: 1;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Content>
        {children}
      </Content>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
