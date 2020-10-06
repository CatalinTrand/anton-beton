import MapScreenLtrStyle from '../../shared/styles/mapScreen.ltr.style';
import MapStyle from '../assets/mapStyle';
import MapView from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import I18n from '../../shared/I18n/I18n';
import {Text, View, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import * as React from "react";
import {useEffect, useState} from "react";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import FloatPlaceholderTextInput from "../../shared/components/sections/floatPlaceholderTextInput";
import BottomTabNavigator from "../components/navigation/bottomTabNavigator";

let _mapView: MapView | null;

const MapScreen = ({route, navigation}) => {

  let once = false;
  let { lng } = route.params;
  I18n.locale = lng;
  const defaultLatZoom = 3.88 * 0.00522;
  const defaultLngZoom = 3.88 * Dimensions.get("window").width / Dimensions.get("window").height * 0.00522;

  // @ts-ignore
  Geocoder.init("AIzaSyD6mSS2a-dROWPXMaS6f8VFIj53B6uLSCU");

  const [marker, setMarker] = useState({latitude: null, longitude: null});
  const [mapRegion, setMapRegion] = useState({latitude: 0, longitude: 0, latitudeDelta: defaultLatZoom, longitudeDelta: defaultLngZoom});
  const [address, setAddress] = useState('');
  const [width, setWidth] = useState('99.9%');

  const monitorPosition = () => {
    Geolocation.getCurrentPosition(position => {
        if (position)
          setMapRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: defaultLatZoom,
            longitudeDelta: defaultLngZoom,
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

  const loadAppointmentScreen = () => {
    if (marker.latitude == null)
      return;

    // @ts-ignore
    Geocoder.from(marker.latitude, marker.longitude)
      .then(json => {
        let addressComponent = json.results[0].formatted_address;
        navigation.navigate('AppointmentScreen', {
          destination_coords: marker,
          destination_name: addressComponent
        });
      })
      .catch(error => console.warn(error));
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
          });
        }
        setMapRegion({latitude: location.lat, longitude: location.lng, latitudeDelta: defaultLatZoom, longitudeDelta: defaultLngZoom});
      })
      .catch(error => console.warn(error));
  };

  const recenterMap = () => {
    if(_mapView == null || mapRegion.latitude == 0)
      return;

    _mapView.animateCamera({
      center: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      },
      zoom: 15,
    });
    setWidth('100.01%');
  };

  const [openSettings, setOpenSettings] = useState(false);

  let markerIcon = require("../assets/images/flag_marker.png");
  let calculatedHeight = Dimensions.get("window").height - 45;

  return (
    <View style={MapScreenLtrStyle.container}>
      {openSettings ?
        [
          <View style={{
            backgroundColor: Colors.lightGrey,
            opacity: 0.6,
            position: 'absolute',
            zIndex: 11,
            top: 0,
            left: 0,
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>,
          <View style={{
            opacity: 1,
            borderRadius: 5,
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderColor: Colors.black,
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            paddingTop: 30,
            paddingBottom: 30,
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '40%',
            marginBottom: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 11
          }}>
            <Text style={{width: '100%', paddingBottom: 30, textAlign: "center", fontSize: Fonts.h6, fontWeight: 'bold', color: Colors.black}}>{I18n.t('settings')}</Text>
            <TouchableOpacity style={{marginBottom: 40, display: 'flex', flexDirection: 'row'}} onPress={() => navigation.navigate('MyCardsScreen')}>
              <CustomIcons
                style={{marginRight: 5}}
                size={Fonts.h6}
                color={Colors.green}
                name="credit-card"
              /><Text style={{color: Colors.green, fontWeight: 'bold', fontSize: Fonts.regular}}>{I18n.t('my_cards')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenSettings(false)}>
              <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: Fonts.regular}}>{I18n.t('back')}</Text>
            </TouchableOpacity>
          </View>] : null
      }
      <View style={MapScreenLtrStyle.topPart}>
        <Header
          placement="left"
          leftComponent={
            <CustomIcons
              style={{marginTop: 15,marginLeft: 10}}
              size={Fonts.h6}
              color={Colors.black}
              name="cog"
              onPress={() => setOpenSettings(true)}
            />
          }
          centerComponent={
            <View style={[MapScreenLtrStyle.title, {marginTop: 15}]}>
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
            style={[MapScreenLtrStyle.map,{zIndex: -1, width: width, height: calculatedHeight}]}
            onMapReady={() => setWidth( '100%' )}
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
                style={{marginLeft: 2}}
                key={1}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={I18n.t('destination')}
                icon={markerIcon}
              /> : null
            }
          </MapView>
      }
      <TouchableOpacity style={MapScreenLtrStyle.recenter_button} onPress={() => recenterMap()}>
        <CustomIcons
          size={Fonts.iconMap}
          color={Colors.black}
          style={{opacity: 1}}
          name="target"
        />
      </TouchableOpacity>
      <TouchableOpacity style={marker.latitude != null ? MapScreenLtrStyle.button : MapScreenLtrStyle.button_disabled} onPress={() => loadAppointmentScreen()}>
        <Text
          style={marker.latitude != null ? MapScreenLtrStyle.button_text : MapScreenLtrStyle.button_disabled_text}>{I18n.t('i_want_concrete_here')}</Text>
      </TouchableOpacity>
      <BottomTabNavigator route={route} navigation={navigation} selected={1}/>
    </View>
  );
};

export default MapScreen;
