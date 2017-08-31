import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Button,
    Footer,
    FooterTab,
    Icon,
    StyleProvider,
    Left,
    Right,
    Body,
    Text,
    Title
} from 'native-base';
import { Alert } from 'react-native';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Peta from './Peta';
import Pesan from './Pesan';
import Langganan from './Langganan';
import Profil from './Profil';
import firebase from '../config/firebase';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.navigation.state.params ? this.props.navigation.state.params.activeTab : "peta",
            userDB: '',
            userImg: 'http://placehold.it/300x300'
        };
    }

    Logout() {
        firebase.database().ref('penumpang/' + this.state.userDB.id_penumpang).update({online: 0});
        firebase.auth().signOut();
        this.props.navigation.navigate('Login');

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.database().ref("penumpang/" + user.uid).once("value").then((snapshot) => {
                    this.setState({
                        userDB: snapshot.val()
                    });
                });

                firebase.storage().ref('penumpang/' + user.uid + '.jpg').getDownloadURL().then((url) => {
                    this.setState({
                        userImg: url
                    });
                }).catch((error) => {
                    this.setState({
                        userImg: 'http://placehold.it/300x300'
                    });
                });
            }
        });
    }

    render() {

        let content = '';
        switch (this.state.activeTab) {
            case 'peta':
                content = <Peta />;
                break;
            case 'pesan':
                content = <Pesan />;
                break;
            case 'langganan':
                content = <Langganan />;
                break;
            case 'profil':
                content = <Profil parent={this} user={this.state.userDB} image={this.state.userImg} />;
                break;
        }

        return (
          <StyleProvider style={getTheme(material)}>
              <Container>

                  <Header noShadow>
                      <Left>
                          <Button transparent>
                              <Icon name="menu" />
                          </Button>
                      </Left>
                      <Body>
                      <Title>{ this.state.activeTab.charAt(0).toUpperCase() + this.state.activeTab.slice(1) }</Title>
                      </Body>
                      <Right>
                          <Button danger onPress={() => this.Logout()}>
                              <Text>Logout</Text>
                          </Button>
                      </Right>
                  </Header>

                  { content }

                  <Footer>
                      <FooterTab>
                          <Button
                            active={this.state.activeTab == 'peta'}
                            onPress={() => this.setState({activeTab: 'peta'})}>
                              <Icon name="map"/>
                          </Button>

                          <Button
                            active={this.state.activeTab == 'pesan'}
                            onPress={() => this.setState({activeTab: 'pesan'})}>
                              <Icon name="message"/>
                          </Button>

                          <Button
                            active={this.state.activeTab == 'langganan'}
                            onPress={() => this.setState({activeTab: 'langganan'})}>
                              <Icon name="directions-car"/>
                          </Button>

                          <Button
                            active={this.state.activeTab == 'profil'}
                            onPress={() => this.setState({activeTab: 'profil'})}>
                              <Icon name="person" />
                          </Button>
                      </FooterTab>
                  </Footer>
              </Container>
          </StyleProvider>
        );
    }
}