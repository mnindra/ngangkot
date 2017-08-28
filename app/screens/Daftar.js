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
import firebase from '../config/firebase';

export default class Daftar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      nama: "",
      email: "",
      alamat: "",
      telp: "",
      password: "",
      konfirmasi_password: ""
    }
  }

  daftar () {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      let d = new Date();
      let tanggal = String(d.getDate());
      let bulan = String(d.getMonth() + 1);
      let tahun = String(d.getFullYear());
      let user = firebase.auth().currentUser;
      firebase.database().ref('penumpang/' + user.uid).set({
        id_penumpang: user.uid,
        nama: this.state.nama,
        email: this.state.email,
        alamat: this.state.alamat,
        telp: this.state.telp,
        password: this.state.password,
        blokir: 0,
        lokasi: {
          latitude: 0,
          longitude: 0
        },
        online: 1,
        tanggal: `${tanggal}/${bulan}/${tahun}`
      });
      this.resetInput();
    });
  }

  resetInput() {
    this.setState({
      nama: "",
      email: "",
      alamat: "",
      telp: "",
      password: "",
      konfirmasi_password: ""
    });
  }

  render() {
    const {goBack} = this.props.navigation;
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
                <Text style={styles.formText}>Daftar sebagai penumpang baru</Text>

                <Form style={styles.form}>
                  <Item floatingLabel>
                    <Icon name="person" style={{color:'#4c4c4c'}}/>
                    <Input
                      placeholder="Nama"
                      value={this.state.nama}
                      onChangeText={(text) => this.setState({nama: text})} />
                  </Item>

                  <Item floatingLabel>
                    <Icon name="email" style={{color:'#4c4c4c'}}/>
                    <Input
                      placeholder="Email"
                      value={this.state.email}
                      onChangeText={(text) => this.setState({email: text})}
                      keyboardType={"email-address"}/>
                  </Item>

                  <Item floatingLabel>
                    <Icon name="location-on" style={{color:'#4c4c4c'}}/>
                    <Input
                      placeholder="Alamat"
                      value={this.state.alamat}
                      onChangeText={(text) => this.setState({alamat: text})} />
                  </Item>

                  <Item floatingLabel>
                    <Icon name="smartphone" style={{color:'#4c4c4c'}}/>
                    <Input
                      placeholder="Nomor Telepon"
                      value={this.state.telp}
                      onChangeText={(text) => this.setState({telp: text})}
                      keyboardType={"numeric"}/>

                  </Item>
                  <Item floatingLabel>
                    <Icon name="lock" style={{color:'#4c4c4c'}}/>
                    <Input
                      placeholder="Password"
                      value={this.state.password}
                      onChangeText={(text) => this.setState({password: text})}
                      secureTextEntry={true}/>
                  </Item>

                  <Item floatingLabel>
                    <Icon name="lock" style={{color:'#4c4c4c'}}/>
                    <Input
                      placeholder="Konfirmasi Password"
                      value={this.state.konfirmasi_password}
                      onChangeText={(text) => this.setState({konfirmasi_password: text})}
                      secureTextEntry={true} />
                  </Item>
                </Form>

                <Button
                  success
                  block
                  onPress={() => this.daftar()}
                  style={{marginBottom: 10}}>
                  <Text>Daftar</Text>
                </Button>

                <Button
                  danger
                  block
                  onPress={() => goBack()}
                  style={{backgroundColor: '#ff4336'}}>
                  <Text>Batal</Text>
                </Button>
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