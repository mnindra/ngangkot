import { StackNavigator } from 'react-navigation';
import Login from './app/screens/Login';
import Daftar from './app/screens/Daftar';
import FotoProfil from './app/screens/FotoProfil';

const ngangkot = StackNavigator({
    Daftar: {screen: Daftar},
    FotoProfil: {screen: FotoProfil},
    Login: {screen: Login},
}, {
    headerMode: 'screen',
    navigationOptions: {
        header: false
    }
});

export default ngangkot;