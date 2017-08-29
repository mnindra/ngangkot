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
    Label
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
            nama: "",
            email: "",
            alamat: "",
            telp: "",
            password: "",
            errors: {}
        }
    }

    daftar () {
        this.validasiForm();
        if (this.isFormValid()) {
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
                this.props.navigation.navigate('FotoProfil');
            }).catch((error) => {
                switch (error.code) {
                    case "auth/network-request-failed":
                        Alert.alert("Koneksi Gagal", "Cek koneksi internet anda");
                        break;
                    case "auth/email-already-in-use":
                        this.setState({
                            errors: {
                                email: "email sudah digunakan"
                            }
                        });
                        break;
                    default:
                        Alert.alert("Terjadi Kesalahan", "Kesalahan tidak diketahui");
                }
            });
        }
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

    validasiForm() {
        this.validate({
            nama: {required: true},
            email: {required: true, email: true},
            alamat: {required: true},
            telp: {required: true, numbers: true},
            password: {required: true, minlength: 6}
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
                                  <Item floatingLabel error={this.isFieldInError('nama')}>
                                      <Icon name="person" style={{color:'#4c4c4c'}}/>
                                      <Input
                                        placeholder="Nama"
                                        value={this.state.nama}
                                        onChangeText={(text) => this.setState({nama: text})} />
                                  </Item>
                                  <ErrorLabel error={this.state.errors.nama} />

                                  <Item floatingLabel error={this.isFieldInError('email')}>
                                      <Icon name="email" style={{color:'#4c4c4c'}}/>
                                      <Input
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({email: text})}
                                        keyboardType={"email-address"}/>
                                  </Item>
                                  <ErrorLabel error={this.state.errors.email} />

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

                                  <Item floatingLabel error={this.isFieldInError('password')}>
                                      <Icon name="lock" style={{color:'#4c4c4c'}}/>
                                      <Input
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChangeText={(text) => this.setState({password: text})}
                                        secureTextEntry={true}/>
                                  </Item>
                                  <ErrorLabel error={this.state.errors.password} />
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
                                onPress={() => this.props.navigation.navigate('Login')}
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