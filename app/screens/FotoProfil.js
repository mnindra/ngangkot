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
import ImagePicker from 'react-native-image-crop-picker';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

export default class FotoProfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
           image: '../images/foto profil.jpg'
        };
    }

    BukaGaleri () {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({
                image: image.path
            });
        });
    }

    BukaCamera () {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({
                image: image.path
            });
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <StyleProvider style={getTheme(material)}>
              <Container style={styles.container}>
                  <Content padder>

                      <Card style={styles.card} transparent>
                          <Content padder>
                              <Text style={styles.formText}>Pilih Foto Profil</Text>
                              <Image source={{uri: this.state.image}} />

                              <Button
                                block
                                style={styles.loginButton}
                                onPress={() => this.BukaGaleri()}>
                                  <Text>Galeri</Text>
                              </Button>
                              <Button
                                success
                                block
                                onPress={() => this.BukaCamera()}><Text>Kamera</Text></Button>
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