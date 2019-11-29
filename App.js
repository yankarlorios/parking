/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FAB, Appbar } from 'react-native-paper';
import RNLocation from 'react-native-location';


RNLocation.configure({
  distanceFilter: 5.0
})

RNLocation.requestPermission({
  ios: "always"
}).then(granted => {
  if (granted) {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
    })
  }
});


const App = () => {
  const [latlng, setLatlng] = useState({
    latitude: 3.4018734,
    longitude: -76.5564799,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [latlngCar, setLatlngCar] = useState();

  const getLocation = () => {
    RNLocation.getLatestLocation()
      .then(latestLocation => {
        // Use the location here
        console.log('latestLocation', latestLocation);
        const coordinates = {
          longitude: latestLocation.longitude,
          latitude: latestLocation.latitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        };

        setLatlngCar(coordinates);
        setLatlng(coordinates);
      })
  }

  const clear = () => {
    setLatlngCar(null);
  };

  return (
    <>
      <StatusBar />
      <View >
        <Appbar.Header style={{ backgroundColor: 'red' }}>

          <Appbar.Content
            title="Parking"
          />
        </Appbar.Header>
      </View>

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={latlng}>
          {/* {latlng} */}
          {latlngCar && <Marker
            coordinate={latlngCar}
            image={require('./car.png')}
          />}
        </MapView>
      </View>
      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => getLocation()}
      />
      <FAB
        style={styles.fab2}
        medium
        icon="close"
        onPress={() => clear()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 80,
    height: '88%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'red'
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 70,
    bottom: 0,
    backgroundColor: 'red'
  },
});
export default App;
