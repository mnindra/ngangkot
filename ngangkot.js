import { StackNavigator } from 'react-navigation';
import Main from './app/screens/Main';

const ngangkot = StackNavigator({
  Main: {screen: Main}
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: false
  }
});

export default ngangkot;