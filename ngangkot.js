import { StackNavigator } from 'react-navigation';
import Login from './app/screens/Login';
import Daftar from './app/screens/Daftar';
import FotoProfil from './app/screens/FotoProfil';
import Main from './app/screens/Main';
import UbahFoto from './app/screens/UbahFoto';
import UbahProfil from './app/screens/UbahProfil';
import UbahPassword from './app/screens/UbahPassword';
import ProfilPengemudi from './app/screens/ProfilPengemudi';
import LihatAngkutan from './app/screens/LihatAngkutan';
import LihatTestimoni from './app/screens/LihatTestimoni';
import RuangPercakapan from './app/screens/RuangPercakapan';

console.ignoredYellowBox = [
    'Setting a timer'
];

const ngangkot = StackNavigator({
    Login: {screen: Login},
    Daftar: {screen: Daftar},
    FotoProfil: {screen: FotoProfil},
    Main: {screen: Main},
    UbahFoto: {screen: UbahFoto},
    UbahProfil: {screen: UbahProfil},
    UbahPassword: {screen: UbahPassword},
    ProfilPengemudi: {screen: ProfilPengemudi},
    LihatAngkutan: {screen: LihatAngkutan},
    LihatTestimoni: {screen: LihatTestimoni},
    RuangPercakapan: {screen: RuangPercakapan}
}, {
    headerMode: 'screen',
    navigationOptions: {
        header: false
    }
});

export default ngangkot;