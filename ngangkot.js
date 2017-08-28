import { StackNavigator } from 'react-navigation';
import Login from './app/screens/Login';
import Daftar from './app/screens/Daftar';

const ngangkot = StackNavigator({
  Main: {screen: Login},
  Daftar: {screen: Daftar}
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: false
  }
});

export default ngangkot;