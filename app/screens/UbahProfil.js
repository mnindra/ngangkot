import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {
    Container,
    Content,
    Button,
    Text,
    Form,
    Item,
    Input,
    Card,
    H2,
    Icon,
    StyleProvider,
    Header,
    Left,
    Body,
    Title
} from 'native-base';
import { StyleSheet, Image, Alert } from 'react-native';
import ErrorLabel from '../components/ErrorLabel';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import firebase from '../config/firebase';

export default class Daftar extends ValidationComponent {

    constructor (props) {
        super(props);
        this.state = {
            nama: this.props.navigation.state.params.user.nama,
            alamat: this.props.navigation.state.params.user.alamat,
            telp: this.props.navigation.state.params.user.telp,
            errors: {}
        }
    }

    ubah () {
        this.validasiForm();
        if (this.isFormValid()) {
            firebase.database().ref('penumpang/' + this.props.navigation.state.params.user.id_penumpang).set({
                nama: this.state.nama,
                alamat: this.state.alamat,
                telp: this.state.telp,
            }).then(() => {
                this.props.navigation.navigate('Main');
            }).catch((error) => {
                switch (error.code) {
                    case "auth/network-request-failed":
                        Alert.alert("Koneksi Gagal", "Cek koneksi internet anda");
                        break;
                    default:
                        Alert.alert("Terjadi Kesalahan", "Kesalahan tidak diketahui");
                }
            });
        }
    }

    validasiForm() {
        this.validate({
            nama: {required: true},
            alamat: {required: true},
            telp: {required: true, numbers: true},
        });

        let errors = {};
        let errors_string = this.getErrorMessages().split("\n");
        errors_string.forEach((error) => {
            for (let key in this.state) {
                if (error.indexOf(key) !== -1) {
                    errors[key] = error;
                }
            }
        });

        this.setState({errors});
    }

    render() {
        return (
          <StyleProvider style={getTheme(material)}>
              <Container style={{ backgroundColor: '#fff' }}>

                  <Header>
                      <Left>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="chevron-left" />
                          </Button>
                      </Left>
                      <Body>
                      <Title>Ubah Profil</Title>
                      </Body>
                  </Header>
                  <Content padder>

                      <Form style={styles.form}>
                          <Item floatingLabel error={this.isFieldInError('nama')}>
                              <Icon name="person" style={{color:'#4c4c4c'}}/>
                              <Input
                                placeholder="Nama"
                                value={this.state.nama}
                                onChangeText={(text) => this.setState({nama: text})} />
                          </Item>
                          <ErrorLabel error={this.state.errors.nama} />

                          <Item floatingLabel error={this.isFieldInError('alamat')}>
                              <Icon name="location-on" style={{color:'#4c4c4c'}}/>
                              <Input
                                placeholder="Alamat"
                                value={this.state.alamat}
                                onChangeText={(text) => this.setState({alamat: text})} />
                          </Item>
                          <ErrorLabel error={this.state.errors.alamat} />

                          <Item floatingLabel error={this.isFieldInError('telp')}>
                              <Icon name="smartphone" style={{color:'#4c4c4c'}}/>
                              <Input
                                placeholder="Nomor Telepon"
                                value={this.state.telp}
                                onChangeText={(text) => this.setState({telp: text})}
                                keyboardType={"numeric"}/>
                          </Item>
                          <ErrorLabel error={this.state.errors.telp} />
                      </Form>

                      <Button
                        primary
                        block
                        onPress={() => this.ubah()}
                        style={{marginBottom: 10}}>
                          <Text>Ubah</Text>
                      </Button>

                  </Content>
              </Container>
          </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
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