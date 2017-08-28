import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Card,
  CardItem,
  Label,
  H2,
  Icon,
  Thumbnail,
  StyleProvider
} from 'native-base';
import { StyleSheet, Image } from 'react-native';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

export default class Login extends Component {

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
      <Container style={styles.container}>
        <Content padder>

          <Image style={styles.logo} source={require('../images/logo.png')} />
          <H2 style={styles.title}>
            Ngangkot
          </H2>

          <Card style={styles.card} transparent>
            <Content padder>
              <Text style={styles.formText}>Login Untuk Melanjutkan</Text>

              <Form style={styles.form}>
                <Item floatingLabel>
                  <Icon name="email" style={{color:'#4c4c4c'}}/>
                  <Input placeholder="Email" />
                </Item>
                <Item floatingLabel>
                  <Icon name="lock" style={{color:'#4c4c4c'}}/>
                  <Input placeholder="Password" />
                </Item>
              </Form>

              <Button block style={styles.loginButton}><Text>Login</Text></Button>
              <Button success block><Text>Daftar</Text></Button>
            </Content>
          </Card>
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00BCD4'
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 30,
    height: 35
  },
  form: {
    marginBottom: 20
  },
  formText: {
    color: '#5f5f5f',
    textAlign: 'center'
  },
  loginButton: {
    marginBottom: 10,
    backgroundColor: '#5c98ed'
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  card: {
    paddingTop: 20
  }
});