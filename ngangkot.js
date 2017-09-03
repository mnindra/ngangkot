import { StackNavigator } from 'react-navigation';
import Login from './app/screens/Login';
import Daftar from './app/screens/Daftar/index';
import FotoProfil from './app/screens/FotoProfil/index';
import Main from './app/screens/Main/index';
import UbahFoto from './app/screens/UbahFoto/index';
import UbahProfil from './app/screens/UbahProfil/index';
import UbahPassword from './app/screens/UbahPassword/index';
import ProfilPengemudi from './app/screens/ProfilPengemudi/index';
import LihatAngkutan from './app/screens/LihatAngkutan/index';
import LihatTestimoni from './app/screens/LihatTestimoni/index';
import RuangPercakapan from './app/screens/RuangPercakapan/index';
import LokasiAwal from './app/screens/LokasiAwal';

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
  RuangPercakapan: {screen: RuangPercakapan},
  LokasiAwal: {screen: LokasiAwal}
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: false
  }
});

export default ngangkot;