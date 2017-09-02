import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {
    Content,
    Text,
    List,
    ListItem,
    Body,
    Thumbnail,
    Right,
    Container,
    Header,
    Title,
    Left,
    Button,
    Icon,
    StyleProvider,
    Form,
    Item,
    Input,
    Label
} from 'native-base';
import StarRating from 'react-native-star-rating';
import ErrorLabel from '../components/ErrorLabel';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import firebase from '../config/firebase';

export default class LihatTestimoni extends ValidationComponent {

    constructor(props) {
        super(props);
        this.placehold = 'http://placehold.it/300x300';
        this.navigationProps = this.props.navigation.state.params;
        this.state = {
            percakapan: [],
            pesan: '',
            errors: {}
        }
    }

    kirim() {
        this.validasiForm();
        if(this.isFormValid()) {
            let d = new Date();
            let tanggal = String(d.getDate());
            let bulan = String(d.getMonth() + 1);
            let tahun = String(d.getFullYear());
            let jam = String(d.getHours());
            let menit = String(d.getMinutes());

            let id_pengemudi = this.navigationProps.pengemudi.id_pengemudi;
            let id_penumpang = this.navigationProps.penumpang.id_penumpang;
            firebase.database().ref('percakapan/' + id_penumpang  + '_' + id_pengemudi + '/pesan').push({
                id_penumpang: firebase.auth().currentUser.uid,
                isi: this.state.pesan,
                waktu: `${tanggal}/${bulan}/${tahun} ${jam}:${menit}`
            });

            this.reset();
        }
    }

    reset() {
        this.setState({
            'pesan': ''
        });
    }

    validasiForm() {
        this.validate({
            'kirim': {required: true},
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

    componentDidMount() {
        let id_pengemudi = this.navigationProps.pengemudi.id_pengemudi;
        let id_penumpang = this.navigationProps.penumpang.id_penumpang;
        firebase.database().ref('percakapan/' + id_penumpang  + '_' + id_pengemudi + '/pesan').on("value", (snapshot) => {
            let percakapan = [];
            for (let index in snapshot.val()) {
                percakapan.push(snapshot.val()[index]);
            }
            this.setState({ percakapan });
        });
    }

    renderRow(rowData) {
        let align = rowData.id_penumpang ? 'right' : 'left';
        let bg = rowData.id_penumpang ? '#00B386' : '#0288d1';
        return (
          <ListItem style={{borderWidth: 0}}>
              <Body style={{padding: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: bg, borderRadius: 15}}>
              <Text note style={{textAlign: align, color: '#fff'}}>{rowData.waktu}</Text>
              <Text style={{textAlign: align, color: '#fff'}}>{rowData.isi}</Text>
              </Body>
          </ListItem>
        );
    }

    render () {
        return (
          <StyleProvider style={getTheme(material)}>
              <Container style={{backgroundColor: '#fff'}}>
                  <Header noShadow>
                      <Left>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="chevron-left" />
                          </Button>
                      </Left>
                      <Body>
                      <Title>{this.navigationProps.pengemudi.nama}</Title>
                      </Body>
                  </Header>

                  <Content style={{backgroundColor: '#f1f1f1'}} padder>
                      <List dataArray={this.state.percakapan} renderRow={(rowData) => this.renderRow(rowData)}></List>
                  </Content>
                  <Form>
                      <Item floatingLabel error={this.isFieldInError('pesan')}>
                          <Label>Tulis Pesan</Label>
                          <Input
                            style={{height: 100}}
                            multiline={true}
                            value={this.state['pesan']}
                            onChangeText={(text) => this.setState({'pesan': text})} />
                      </Item>
                      <ErrorLabel error={this.state.errors['pesan']} />
                      <Button
                        success
                        full
                        block
                        style={{marginTop: 10}}
                        onPress={() => this.kirim()}>
                          <Text>Kirim</Text>
                      </Button>
                  </Form>
              </Container>
          </StyleProvider>
        )
    }

}