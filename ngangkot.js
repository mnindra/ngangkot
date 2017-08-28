import { StackNavigator } from 'react-navigation';
import Login from './app/screens/Login';

const ngangkot = StackNavigator({
  Main: {screen: Login}
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: false
  }
});

export default ngangkot;