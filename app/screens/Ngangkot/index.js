import React, {Component} from 'react';
import {
  Content,
  Text,
  Button,
} from 'native-base';
import {Image, View} from 'react-native';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Ngangkot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingAnimation: false
    };
    this.navigation = this.props.parent.props.navigation;
  }

  cariAngkot() {
    this.setState({loadingAnimation: true});
    this.setState({loadingAnimation: false});
    this.navigation.navigate('LokasiAwal');
  }

  render () {
    return (
        <View style={styles.content}>
          <Image style={styles.logo} source={require('../../images/logo.png')} />
          <Button style={styles.button} onPress={() => this.cariAngkot()}><Text>Cari Angkot</Text></Button>
          <Spinner
            visible={this.state.loadingAnimation}
            textContent={"Memuat Peta..."}
            textStyle={{color: '#FFF'}}
            overlayColor={"#00BCD4"}/>
        </View>
    )
  }

}