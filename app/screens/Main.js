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
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Peta from './Peta';
import Pesan from './Pesan';
import Langganan from './Langganan';
import Profil from './Profil';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'peta'
        };
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
                content = <Profil />;
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
                          <Button danger>
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