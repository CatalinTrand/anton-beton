import React, { useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import { PropTypes } from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import I18n from '../../shared/I18n/I18n';
import { Colors, CustomIcons, Fonts } from '../../shared/themes';
import GlobalLtrStyle from '../../shared/styles/global.ltr.style';
import Header from '../components/sections/header';
import SearchSpecialistsLtrStyle from '../../shared/styles/searchSpecialists.ltr.style';
import noDataView from '../../shared/components/sections/noDataView';
import DoctorCellLtrStyle from '../../shared/styles/doctorCell.ltr.styles';
import CustomModal from '../../shared/components/sections/customModal';
import FiltersModalLtrStyle from '../../shared/styles/filtersModal.ltr.style';
import DoctorCell from '../components/sections/doctorCell';

const SpecializationScreen = ({ route, navigation }): JSX.Element => {
  const data = route.params?.data ?? '';
  const [refreshing, setRefreshing] = useState(false);
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ionescu Mihai Paul',
      firstName: 'Mihai Paul',
      lastName: 'Ionescu',
      rating: 4.9,
      price: 120,
      reviewsNumber: 103,
      status: 'online',
      isFavorite: true,
      specialization: 'cardiologie',
      imgUrl:
        'https://img.medscape.com/thumbnail_library/dt_140605_serious_male_doctor_hospital_800x600.jpg',
    },
    {
      id: 2,
      name: 'Dr. Maria Luminita',
      firstName: 'Luminita',
      lastName: 'Maria',
      price: 140,
      rating: 5.0,
      isFavorite: false,
      reviewsNumber: 83,
      specialization: 'neurologie',
      status: 'offline',
      imgUrl: 'https://specials-images.forbesimg.com/imageserve/1139665860/960x0.jpg?fit=scale',
    },
    {
      id: 3,
      name: 'Dr. Marian Lungu',
      firstName: 'Marian',
      lastName: 'Lungu',
      price: 115,
      isFavorite: true,
      rating: 4.7,
      specialization: 'pediatrie',
      reviewsNumber: 238,
      status: 'online',
    },
  ];
  const onListEndReached = () => {
    console.warn('jos');
  };
  const onRefresh = () => {
    console.warn('refresh');
  };

  const keyExtractor = (item, index) => index.toString();
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const availabilityBtns = [
    {
      id: 1,
      name: 'medical_app.available',
      color: Colors.green,
      customStyle: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 0,
      },
    },
    {
      id: 2,
      name: 'medical_app.unavailable',
      color: Colors.grey,
      customStyle: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 0,
      },
    },
  ];
  const renderFiltersButton = () => {
    return (
      <TouchableOpacity
        style={[DoctorCellLtrStyle.filters]}
        activeOpacity={0.7}
        onPress={() => setFiltersModalVisible(true)}
      >
        <CustomIcons name="filters" size={Fonts.small} color={Colors.white} />
      </TouchableOpacity>
    );
  };
  const [checkedAvailabilityBtn, setCheckedAvailabilityBtn] = useState(0);
  const [checkedRating, setCheckedRating] = useState(0);
  const [minPrice] = useState(10);
  const [maxPrice] = useState(1000);
  const [multiSliderValue, setMultiSliderValue] = useState([55, 234]);
  const multiSliderValuesChange = (values) => {
    setMultiSliderValue(values);
  };
  const renderFiltersModal = () => {
    return (
      <CustomModal
        visible={filtersModalVisible}
        animation="slide"
        mode="overFullScreen"
        boxBackgroundColor={Colors.white}
        transparentContainer
        transparentBackground={Colors.blackOpacity}
        bottomHalf
        outsideClick={() => {
          setFiltersModalVisible(false);
        }}
      >
        <View style={[FiltersModalLtrStyle.row]}>
          <CustomIcons name="filters" size={Fonts.small} color={Colors.black} />
          <Text style={[FiltersModalLtrStyle.header]}>{I18n.t('medical_app.filter')}</Text>
        </View>
        <View>
          <Text style={[FiltersModalLtrStyle.subheader]}>{I18n.t('medical_app.price')}</Text>
        </View>
        <View
          style={[
            FiltersModalLtrStyle.row,
            { justifyContent: 'space-between', alignItems: 'center' },
          ]}
        >
          <Text style={[FiltersModalLtrStyle.text]}>{multiSliderValue[0]}</Text>
          <MultiSlider
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={250}
            onValuesChange={multiSliderValuesChange}
            min={minPrice}
            max={maxPrice}
            step={10}
            allowOverlap
            snapped
            isMarkersSeparated
            customMarkerLeft={() => {
              return (
                <View style={[FiltersModalLtrStyle.circle, { backgroundColor: Colors.orange }]} />
              );
            }}
            customMarkerRight={() => {
              return (
                <View style={[FiltersModalLtrStyle.circle, { backgroundColor: Colors.orange }]} />
              );
            }}
            trackStyle={{
              height: 3,
              backgroundColor: Colors.lightOrange,
            }}
            selectedStyle={{
              backgroundColor: Colors.orange,
            }}
            unselectedStyle={{
              backgroundColor: Colors.lightOrange,
            }}
            containerStyle={{ marginBottom: 15 }}
          />
          <Text style={[FiltersModalLtrStyle.text]}>{multiSliderValue[1]}</Text>
        </View>
        <View>
          <Text style={[FiltersModalLtrStyle.subheader]}>{I18n.t('medical_app.availability')}</Text>
        </View>
        <View style={[FiltersModalLtrStyle.row]}>
          {availabilityBtns.map((btn, key) => {
            return (
              <TouchableOpacity
                key={key.toString()}
                onPress={() => setCheckedAvailabilityBtn(key)}
                style={[
                  FiltersModalLtrStyle.box,
                  btn.customStyle,
                  checkedAvailabilityBtn === key &&
                    key === 0 && {
                      borderRightWidth: 2,
                    },
                  checkedAvailabilityBtn === key &&
                    key === 1 && {
                      borderLeftWidth: 2,
                    },
                  {
                    borderColor: checkedAvailabilityBtn === key ? Colors.orange : Colors.grey,
                  },
                ]}
              >
                <View style={[FiltersModalLtrStyle.circle, { backgroundColor: btn.color }]} />
                <Text style={[FiltersModalLtrStyle.textBtn]}>{I18n.t(btn.name)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <Text style={[FiltersModalLtrStyle.subheader]}>{I18n.t('medical_app.rating')}</Text>
        </View>
        <View style={[FiltersModalLtrStyle.row, { borderBottomWidth: 0 }]}>
          {[4, 3, 2, 1, 0].map((rating, key) => {
            return (
              <TouchableOpacity
                key={key.toString()}
                onPress={() => setCheckedRating(key)}
                style={[
                  FiltersModalLtrStyle.box,
                  {
                    borderLeftWidth: key > checkedRating ? 0 : 2,
                    borderRightWidth: key < checkedRating ? 0 : 2,
                    borderTopLeftRadius: key === 0 ? 10 : 0,
                    borderBottomLeftRadius: key === 0 ? 10 : 0,
                    borderTopRightRadius: key === 4 ? 10 : 0,
                    borderBottomRightRadius: key === 4 ? 10 : 0,
                    borderColor: checkedRating === key ? Colors.orange : Colors.grey,
                  },
                ]}
              >
                <CustomIcons
                  name="star"
                  color={checkedRating === key ? Colors.orange : Colors.grey}
                  size={Fonts.regular}
                />
                <Text style={[FiltersModalLtrStyle.textBtn]}>{rating + 1}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </CustomModal>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        centerComponent={<Text style={GlobalLtrStyle.headerText}>{data.name}</Text>}
        rightComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="search"
            onPress={() => console.warn('cauta')}
          />
        }
      />
      <FlatList
        style={SearchSpecialistsLtrStyle.categoriesWrapper}
        keyExtractor={keyExtractor}
        ListEmptyComponent={noDataView('medical_app.no_doctors')}
        data={doctors}
        renderItem={({ item, index }) => (
          <DoctorCell item={item} key={index} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              onRefresh();
            }}
          />
        }
        onEndReached={() => onListEndReached()}
        onEndReachedThreshold={0.01}
        initialNumToRender={10}
      />
      {renderFiltersButton()}
      {renderFiltersModal()}
    </SafeAreaView>
  );
};

SpecializationScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.shape({}),
    }).isRequired,
  }).isRequired,
};

export default SpecializationScreen;
