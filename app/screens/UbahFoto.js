import React, { Component } from 'react';
import {
    Container,
    Content,
    Button,
    Text,
    Card,
    H2,
    Icon,
    Grid,
    Col,
    StyleProvider,
    Header,
    Left,
    Body,
    Title
} from 'native-base';
import { StyleSheet, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import firebase from '../config/firebase';
import RNFetchBlob from 'react-native-fetch-blob'

export default class UbahFoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imagePath: this.props.navigation.state.params.image
        };
    }

    BukaGaleri () {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropperActiveWidgetColor: '#484fff',
            cropperToolbarColor: '#5b82ff',
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({
                image: image.data,
                imagePath: image.path
            });
        });
    }

    BukaCamera () {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({
                image: image.data,
                imagePath: image.path
            });
        });
    }

    UploadFoto() {
        if (this.state.image == '') {
            Alert.alert("Foto Profil", "Pilih foto profil terlebih dahulu");
        } else {
            const Blob = RNFetchBlob.polyfill.Blob;
            const fs = RNFetchBlob.fs;
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
            window.Blob = Blob;

            let uid = firebase.auth().currentUser.uid;
            const imageRef = firebase.storage().ref("penumpang/" + uid + ".jpg");
            let mime = 'image/jpg';
            fs.readFile(this.state.imagePath, 'base64').then((data) => {
                return Blob.build(data, {type: `${mime};BASE64`})
            }).then((blob) => {
                return imageRef.put(blob, { contentType: mime })
            }).then(() => {
                this.props.navigation.navigate('Main');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        return (
          <StyleProvider style={getTheme(material)}>
              <Container>
                  <Header>
                      <Left>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="chevron-left" />
                          </Button>
                      </Left>
                      <Body>
                      <Title>Ubah Foto Profil</Title>
                      </Body>
                  </Header>
                  <Content padder>

                      <Card>
                          <Content padder>
                              <Image style={styles.image} source={{ isStatic:true, uri:this.state.imagePath }} />

                              <Grid>
                                  <Col style={{width: '50%', paddingRight: 5}}>
                                      <Button
                                        danger
                                        block
                                        bordered
                                        iconLeft
                                        onPress={() => this.BukaCamera()}>
                                          <Icon name="photo-camera" />
                                          <Text>Kamera</Text>
                                      </Button>
                                  </Col>
                                  <Col style={{width: '50%', paddingLeft: 5}}>
                                      <Button
                                        success
                                        block
                                        bordered
                                        iconLeft
                                        onPress={() => this.BukaGaleri()}>
                                          <Icon name="collections" />
                                          <Text>Galeri</Text>
                                      </Button>
                                  </Col>
                              </Grid>

                          </Content>
                      </Card>

                      <Button
                        primary
                        block
                        style={{marginTop:10}}
                        onPress={() => this.UploadFoto()}>
                          <Text>Ubah Foto</Text>
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
        marginTop: 20,
        marginBottom: 20,
        fontSize: 30,
        height: 35
    },
    image: {
        width: '100%',
        height: 300,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 10
    }
});