/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import MapView from 'react-native-maps';

import { enableLatestRenderer } from 'react-native-maps';
import { Icon, SearchBar } from '@rneui/themed';
import { Button } from '@rneui/base';
enableLatestRenderer();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function SearchBarSection({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = false;
  const [searchBarText, setSearchBarText] = useState('')
  const updateSearch = (search: string) => {
    setSearchBarText(search)
  }
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
      <SearchBar
        placeholder="Search for bus stops"
        onChangeText={updateSearch}
        value={searchBarText}
        round={true}
        lightTheme={true}
        searchIcon={<Icon name="search" type="font-awesome" color="#86939e" />}
        inputContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
        containerStyle={{ backgroundColor: 'lightgrey', borderRadius: 10 }}
        showLoading={searchBarText.length > 0}
      />
    </View >
  );
}

const requestLocationPermission = async () => {
  console.log("Requesting location permission");
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'NextBus Location Permission',
        message:
          'NextBus needs access to your location ' +
          'so you can find yourself on the map more easily.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

function App(): React.JSX.Element {
  const isDarkMode = false;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const requestLocationPermission = async () => {
    console.log("Requesting location permission");
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'NextBus Location Permission',
          message:
            'NextBus needs access to your location ' +
            'so you can find yourself on the map more easily.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    checkLocationPermission();
  };

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted) {
        console.log("Location permission granted");
        setHasLocationPermission(true);
      } else {
        console.log("Location permission denied");
        setHasLocationPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {!hasLocationPermission && <View>
        <Button onPress={requestLocationPermission}>Request Location Permission</Button>
      </View>}
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <SearchBarSection title="Next Bus">
          Where are you going?
        </SearchBarSection>
        <MapView
          style={{ width: '100%', height: '95%' }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: 51.5014,
            longitude: -0.1419,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    marginBottom: 32,
    marginHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
