import ViewTruckMapScreenLtrStyle from '../../shared/styles/ViewTruckMapScreen.ltr.style';
import * as React from "react";
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import {Alert, Dimensions, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import OrderScreenLtrStyle from "../../shared/styles/orderScreen.ltr.style";
import I18n from "../../shared/I18n/I18n";
import MapStyle from "../assets/mapStyle";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import {useState} from "react";

let _mapView: MapView | null;

const ViewTruckMapScreen = ({route, navigation}) => {

  const {id, supplier_id} = route.params;

  const [destinationMarker, setDestinationMarker] = useState({lat: 0, lng: 0});
  const [truckMarker, setTruckMarker] = useState({lat: 0, lng: 0});
  const [mapRegion, setMapRegion] = useState({latitude: 10, longitude: 10, latitudeDelta: 1, longitudeDelta: 1});
  const [eta, setEta] = useState('Calculating...');

  const distanceBetween2Points = (p1, p2) => {
    // in metres
    const R = 6371000; // metres
    const t1 = p1.lat * Math.PI/180;
    const t2 = p2.lat * Math.PI/180;
    const dt = (p2.lat - p1.lat) * Math.PI/180;
    const dg = (p2.lng - p1.lng) * Math.PI/180;

    const a = Math.sin(dt/2) * Math.sin(dt/2) + Math.cos(t1) * Math.cos(t2) * Math.sin(dg/2) * Math.sin(dg/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const middleZoom = (pos1, pos2) => {
    let middleLat = (pos1.lat + pos2.lat ) / 2;
    let deviceWidth = Dimensions.get('window').width - 30;
    let distance = distanceBetween2Points(pos1,pos2);

    let zoom = Math.log2(156543.03392 * Math.cos(middleLat * Math.PI / 180) * (deviceWidth - 30) / distance);

    return Math.floor(zoom);
  };

  const initializeState = () => {
    //TODO - get locations from server
    let truckLocation = {lat: 45.0, lng: 21.0};
    let destination = {lat: 45.2, lng: 21.2};

    let middleLat = (truckLocation.lat + destination.lat) / 2.0;
    let middleLng = (truckLocation.lng + destination.lng) / 2.0;

    setMapRegion({
      latitude: middleLat,
      longitude: middleLng,
      latitudeDelta: 1,
      longitudeDelta: 1
    });
    setDestinationMarker(destination);
    setTruckMarker(truckLocation);

    if (_mapView !== null)
      _mapView.animateCamera({
        center: {
          latitude: middleLat,
          longitude: middleLng
        },
        zoom: middleZoom(truckLocation, destination),
      });
  };

  const prettyDuration = (mins) => {
    let hours = mins / 60;
    if(hours < 1) {
      return Math.floor(mins) + "m";
    } else {
      return Math.floor(hours) + "h " + (mins - Math.floor(hours)*60)+ "m";
    }
  };

  let markerIcon = require("../assets/images/flag_marker.png");
  let truckIcon = require("../assets/images/truck_marker.png");

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: Colors.white}}>
      <Header
        containerPaddingBottom={15}
        placement="left"
        leftComponent={
          <CustomIcons
            style={{marginTop: 15}}
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <View style={[OrderScreenLtrStyle.title, {marginTop: 15}]}>
            <Text style={[OrderScreenLtrStyle.title_text,{color: Colors.black}]}>{I18n.t('delivery_progress') + " #" + id}</Text>
          </View>
        }
        rightComponent={null}
        noBorder={false}
      />
      <MapView
        style={ViewTruckMapScreenLtrStyle.map}
        customMapStyle={MapStyle}
        initialRegion={mapRegion}
        ref={(mapView) => {
          _mapView = mapView
        }}
        onMapReady={initializeState}
        onPress={(e) => {
        }}
      >
        <MapViewDirections
          origin={{latitude: truckMarker.lat, longitude: truckMarker.lng}}
          destination={{latitude: destinationMarker.lat, longitude: destinationMarker.lng}}
          apikey="AIzaSyD6mSS2a-dROWPXMaS6f8VFIj53B6uLSCU"
          strokeWidth={3}
          strokeColor={Colors.primary}
          onReady={(result) => setEta(prettyDuration(result.duration))}
        />
        {truckMarker.lat != 0 ?
          // @ts-ignore
          <MapView.Marker
            style={{}}
            key={1}
            title={I18n.t('truck')}
            coordinate={{latitude: truckMarker.lat, longitude: truckMarker.lng}}
            icon={truckIcon}
          /> : null
        }
        {destinationMarker.lat != 0 ?
          // @ts-ignore
          <MapView.Marker
            title={I18n.t('destination')}
            style={{marginLeft: 2}}
            key={2}
            coordinate={{latitude: destinationMarker.lat, longitude: destinationMarker.lng}}
            icon={markerIcon}
          /> : null
        }
      </MapView>
      <Text style={ViewTruckMapScreenLtrStyle.eta}>{"ETA: " + eta}</Text>
    </SafeAreaView>
  );
};

export default ViewTruckMapScreen;
