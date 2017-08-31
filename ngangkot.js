import { StackNavigator } from 'react-navigation';
import Login from './app/screens/Login';
import Daftar from './app/screens/Daftar';
import FotoProfil from './app/screens/FotoProfil';
import Main from './app/screens/Main';

console.ignoredYellowBox = [
    'Setting a timer'
];

const ngangkot = StackNavigator({
    Login: {screen: Login},
    Daftar: {screen: Daftar},
    FotoProfil: {screen: FotoProfil},
    Main: {screen: Main},

}, {
    headerMode: 'screen',
    navigationOptions: {
        header: false
    }
});

export default ngangkot;