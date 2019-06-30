import React from 'react';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

import { Container } from 'react-bootstrap'

/* Template body */

export const Template = (props) => (
  <Container>
    <Header content={props.content}>
      <h1><a href="/">{props.appName}</a> <small>Vaddis github page</small></h1>
      <p>A small react Application which contains some stuff from my github repositories.</p>
    </Header>
    <Content content={props.content}>
      {props.children}
    </Content>
    <Footer>
      <p>Source: <a href="https://github.com/vaddi/vaddi.github.io">github.vaddi.io</a></p>
    </Footer>
  </Container>
);
