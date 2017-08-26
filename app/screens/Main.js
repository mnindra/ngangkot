import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Text
} from 'native-base';

export default class Main extends Component {

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button danger>
            <Text>Click Me</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}