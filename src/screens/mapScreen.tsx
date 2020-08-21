import MapScreenLtrStyle from '../../shared/styles/mapScreen.ltr.style';
import MapStyle from '../assets/mapStyle';
import MapView from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import I18n from '../../shared/I18n/I18n';
import {Text, View, TouchableOpacity, ImageBackground, Image} from 'react-native';
import * as React from "react";
import {useEffect, useState} from "react";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import FloatPlaceholderTextInput from "../../shared/components/sections/floatPlaceholderTextInput";

let _mapView: MapView | null;
let once = false;

const MapScreen = ({route, navigation}) => {

  // @ts-ignore
  Geocoder.init("AIzaSyD6mSS2a-dROWPXMaS6f8VFIj53B6uLSCU");

  const [marker, setMarker] = useState({latitude: null, longitude: null});
  const [mapRegion, setMapRegion] = useState({latitude: 0, longitude: 0, latitudeDelta: 1, longitudeDelta: 1});
  const [address, setAddress] = useState('');

  const monitorPosition = () => {
    Geolocation.getCurrentPosition(position => {
        if (position)
          setMapRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
  };

  if (!once) {
    monitorPosition();
    once = true;
  }

  const handleMapPress = (e) => {
    console.log(e.nativeEvent.coordinate);
    setMarker({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  const searchAddress = (address) => {
    // @ts-ignore
    Geocoder.from(address)
      .then(json => {
        let location = json.results[0].geometry.location;
        console.log(location);
        setMarker({latitude: location.lat, longitude: location.lng});
        if (_mapView != null) {
          console.log(mapRegion);
          _mapView.animateCamera({
            center: {
              latitude: location.lat,
              longitude: location.lng
            },
            zoom: 15,
          },);
        }
        setMapRegion({latitude: location.lat, longitude: location.lng, latitudeDelta: 1, longitudeDelta: 1});
      })
      .catch(error => console.warn(error));
  };

  let markerIcon = require("../assets/images/flag_marker.png");

  return (
    <View style={MapScreenLtrStyle.container}>
      <View style={MapScreenLtrStyle.topPart}>
        <Header
          placement="left"
          leftComponent={
            <CustomIcons
              size={Fonts.medium}
              color={Colors.black}
              name="arrow-back"
              onPress={navigation.goBack}
            />
          }
          centerComponent={
            <View style={MapScreenLtrStyle.title}>
              <Text style={MapScreenLtrStyle.title_text}>{I18n.t('address_search')}</Text>
            </View>
          }
          rightComponent={null}
          noBorder={true}
        />
        <View style={MapScreenLtrStyle.searchAddress}>
          <FloatPlaceholderTextInput
            extraStyle={MapScreenLtrStyle.searchAddressInput}
            label={I18n.t('address')}
            value={address}
            type="regular"
            onChange={(value) => setAddress(value)}
          />
          <CustomIcons
            style={MapScreenLtrStyle.searchIcon}
            size={Fonts.h5}
            color={Colors.black}
            name="search"
            onPress={() => searchAddress(address)}
          />
        </View>
      </View>
      {
        mapRegion.latitude == 0 ? null :
          <MapView
            style={MapScreenLtrStyle.map}
            customMapStyle={MapStyle}
            initialRegion={mapRegion}
            onPress={(e) => handleMapPress(e)}
            ref={(mapView) => {
              _mapView = mapView
            }}
            showsUserLocation={true}
          >
            {marker.latitude != null ?
              // @ts-ignore
              <MapView.Marker
                key={1}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={I18n.t('destination')}
                icon={markerIcon}
              />: null
            }
          </MapView>
      }
      <TouchableOpacity style={MapScreenLtrStyle.button}>
        <Text style={MapScreenLtrStyle.button_text}>{I18n.t('i_want_concrete_here')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
