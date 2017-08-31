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
    StyleProvider
} from 'native-base';
import { StyleSheet, Image, Alert } from 'react-native';
import ErrorLabel from '../components/ErrorLabel';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import firebase from '../config/firebase';

export default class Login extends ValidationComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    login() {
        this.validasiForm();

        if (this.isFormValid()) {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                let uid = firebase.auth().currentUser.uid;
                firebase.database().ref("penumpang/" + uid).once("value").then((snapshot) => {
                    if (snapshot.val()) {
                        firebase.database().ref("penumpang/" + uid).update({online: 1});
                       this.resetInput();
                       this.props.navigation.navigate('Main');
                   } else {
                       this.setState({
                           password: "",
                           errors: {
                               email: "email tidak ditemukan"
                           }
                       });
                       firebase.auth().signOut();
                   }
                });
            }).catch((error) => {
                switch (error.code) {
                    case "auth/network-request-failed":
                        Alert.alert("Koneksi Gagal", "Cek koneksi internet anda");
                        break;
                    case "auth/user-not-found":
                        this.setState({
                            password: "",
                            errors: {
                                email: "email tidak ditemukan"
                            }
                        });
                        break;
                    case "auth/wrong-password":
                        this.setState({
                            password: "",
                            errors: {
                                password: "password tidak cocok"
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
         email: "",
         password: ""
      });
    }

    validasiForm() {
        this.validate({
            email: {required: true, email: true},
            password: {required: true}
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
        const { navigate } = this.props.navigation;
        return (
          <StyleProvider style={getTheme(material)}>
            <Container style={styles.container}>
              <Content padder>

                <Image style={styles.logo} source={require('../images/logo.png')} />
                <H2 style={styles.title}>
                  Ngangkot
                </H2>
                  <Text
                    style={{textAlign: 'center', color: '#fff', marginBottom: 20}}>
                      Penumpang
                  </Text>

                <Card style={styles.card} transparent>
                  <Content padder>
                    <Text style={styles.formText}>Login Untuk Melanjutkan</Text>

                    <Form style={styles.form}>
                      <Item floatingLabel error={this.isFieldInError('email')}>
                        <Icon name="email" style={{color:'#4c4c4c'}}/>
                        <Input
                          placeholder="Email"
                          value={this.state.email}
                          keyboardType={"email-address"}
                          onChangeText={(text) => this.setState({email: text})}/>
                      </Item>
                      <ErrorLabel error={this.state.errors.email} />

                      <Item floatingLabel error={this.isFieldInError('password')}>
                        <Icon name="lock" style={{color:'#4c4c4c'}}/>
                        <Input
                          placeholder="Password"
                          value={this.state.password}
                          secureTextEntry={true}
                          onChangeText={(text) => this.setState({password: text})}/>
                      </Item>
                      <ErrorLabel error={this.state.errors.password} />

                    </Form>

                    <Button block style={styles.loginButton} onPress={() => this.login()}><Text>Login</Text></Button>
                    <Button success block onPress={() => navigate('Daftar')}><Text>Daftar</Text></Button>
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