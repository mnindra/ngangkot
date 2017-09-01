import React, {Component} from 'react';
import {
    Content,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Thumbnail,
    Right,
    Button
} from 'native-base';
import {Alert} from 'react-native';
import firebase from '../config/firebase';

export default class Langganan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pengemudi: []
        }
    }

    batal(id_pengemudi) {
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('penumpang/' + uid + '/langganan/' + id_pengemudi).remove();
    }

    renderRow(rowData) {
        let konfirmasi = '';
        let batal = '';

        if (this.props.user.langganan[rowData.id_pengemudi].status == 0) {
            konfirmasi = 'Belum Dikonfirmasi';
            batal = <Button small danger onPress={() => this.batal(rowData.id_pengemudi)}><Text>Batal</Text></Button>
        }

        return (
          <ListItem
            avatar
            button
            onPress={() => this.props.parent.props.navigation.navigate('ProfilPengemudi', {pengemudi:rowData, penumpang: this.props.user})}
            style={{paddingBottom:10}}>
              <Left>
                  <Thumbnail square source={{ uri: rowData.foto || 'http://placehold.it/300x300' }} />
              </Left>
              <Body>
              <Text>{rowData.nama}</Text>
              <Text note style={{color: '#b5423c'}}>{konfirmasi}</Text>
              </Body>
              <Right>
                  {batal}
              </Right>
          </ListItem>
        )
    }

    render () {
        return (
          <Content style={{ backgroundColor: '#fff' }} padder>
              <List dataArray={this.props.langganan} renderRow={(rowData) => this.renderRow(rowData)}>
              </List>
          </Content>
        )
    }

}