import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  mapContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  textHint: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    textAlign: 'center',
    paddingTop: 10
  },
  pickerContainer: {
    flex: 1
  },
  labelBiaya: {
    marginBottom: 10
  }
});

export default styles;