import React, {useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View, ScrollView} from 'react-native';
// @ts-ignore
import {PropTypes} from 'prop-types';
import I18n from '../../shared/I18n/I18n';
import {Colors, CustomIcons, Fonts, Metrics} from '../../shared/themes';
import GlobalLtrStyle from '../../shared/styles/global.ltr.style';
import Header from '../components/sections/header';
import DoctorProfileLtrStyle from '../../shared/styles/doctorProfile.ltr.style';
import DoctorCellLtrStyle from '../../shared/styles/doctorCell.ltr.styles';
import UserAvatar from '../../shared/components/sections/userAvatar';
import noDataView from '../../shared/components/sections/noDataView';
import OnlineStatusBtns from '../components/sections/onlineStatusBtns';
import OfflineStatusBtn from '../components/sections/offlineStatusBtn';
import RegularButton from '../../shared/components/buttons/regularButton';

const DoctorProfile = ({route, navigation}): JSX.Element => {
  const data = route.params?.data ?? '';
  const {specialization, status, imgUrl, firstName, lastName, name, rating, reviewsNumber, price} = data;
  const ratingString = `${rating} (${reviewsNumber})`;
  const [favorite, setFavorite] = useState(false);
  const rightComponent = () => {
    return (
      <View style={[DoctorProfileLtrStyle.row]}>
        <TouchableOpacity
          style={DoctorProfileLtrStyle.iconWrapper}
          onPress={() => console.warn('share')}
        >
          <CustomIcons size={Fonts.medium} color={Colors.black} name="share"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={DoctorProfileLtrStyle.iconWrapper}
          onPress={() => setFavorite(!favorite)}
        >
          <CustomIcons
            size={Fonts.medium}
            color={favorite ? Colors.orange : Colors.black}
            name={favorite ? 'filled-heart' : 'heart'}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const schedule = [
    {
      day: 1,
      interval: "9:00 - 14:00"
    },
    {
      day: 2,
      interval: "11:00 - 15:00"
    },
    {
      day: 3,
      interval: "9:00 - 14:00"
    },
    {
      day: 4,
      interval: "9:00 - 14:00"
    },
    {
      day: 5,
      interval: "9:00 - 14:00"
    },
    {
      day: 6,
      interval: "9:00 - 14:00"
    },
    {
      day: 7,
      interval: null
    }
  ];
  const reviews = [
    {
      id: 1,
      created_at: '25 Martie 2020',
      name: 'Maria',
      review: 5,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      created_at: '25 Martie 2020',
      name: 'Ionut',
      review: 4,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      created_at: '25 Martie 2020',
      name: 'Daniel',
      review: 5,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 4,
      created_at: '25 Martie 2020',
      name: 'Daniel',
      review: 5,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 5,
      created_at: '25 Martie 2020',
      name: 'Daniel',
      review: 5,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 6,
      created_at: '25 Martie 2020',
      name: 'Daniel',
      review: 5,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];
  const lastUpdate = '25 Martie 2019';
  const cvUpdatedString = `${I18n.t('medical_app.lastUpdated')} ${lastUpdate}`;
  const [refreshing, setRefreshing] = useState(false);
  const onListEndReached = () => {
    console.warn('jos');
  };
  const onRefresh = () => {
    console.warn('refresh');
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          DoctorProfileLtrStyle.rowWrapper,
          {
            borderBottomWidth: index < reviews.length - 1 ? 1 : 0,
          },
        ]}
      >
        <View style={[DoctorProfileLtrStyle.rowNoMargin]}>
          <View style={[DoctorProfileLtrStyle.column, {marginLeft: Metrics.baseMargin}]}>
            <Text style={[DoctorProfileLtrStyle.name]}>{item.name}</Text>
            <Text style={[DoctorProfileLtrStyle.date]}>{item.created_at}</Text>
          </View>
          <View style={[DoctorProfileLtrStyle.row]}>
            <CustomIcons name="star" size={Fonts.medium} color={Colors.darkGrey}/>
            <Text style={[DoctorProfileLtrStyle.rating]}>{item.review}</Text>
          </View>
        </View>
        <View style={[DoctorProfileLtrStyle.row]}>
          <Text style={[DoctorProfileLtrStyle.message]}>{item.message}</Text>
        </View>
      </View>
    );
  };
  const keyExtractor = (item, index) => index.toString();
  const renderHeader = () => {
    return (
      <>
        <View style={[DoctorCellLtrStyle.wrapper, {margin: Metrics.doubleBaseMargin}]}>
          <View style={[DoctorCellLtrStyle.wrapperRow]}>
            <View
              style={[
                DoctorCellLtrStyle.avatar,
                status === 'online'
                  ? {borderWidth: 2, borderColor: Colors.green}
                  : {borderWidth: 2, borderColor: Colors.grey},
              ]}
            >
              <UserAvatar
                imageURL={imgUrl}
                firstName={firstName}
                lastName={lastName}
                theme={Colors.borderGrey}
                size={Metrics.avatarWidth}
              />
            </View>
            <View style={[DoctorCellLtrStyle.rightData]}>
              <Text style={[DoctorCellLtrStyle.specialization]}>{specialization}</Text>
              <Text style={[DoctorCellLtrStyle.name]}>{name}</Text>
              <View style={[DoctorCellLtrStyle.ratingRow]}>
                <CustomIcons name="star" size={Fonts.small} color={Colors.darkGrey}/>
                <Text style={[DoctorCellLtrStyle.ratingText]}>{ratingString}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[DoctorCellLtrStyle.wrapper, {margin: Metrics.doubleBaseMargin}]}>
          <TouchableOpacity onPress={() => console.warn('view cv')}>
            <View style={[DoctorProfileLtrStyle.wrapperRow]}>
              <CustomIcons name="document" size={Fonts.h6} color={Colors.black}/>
              <View style={[DoctorProfileLtrStyle.column, {marginLeft: Metrics.baseMargin}]}>
                <Text style={[DoctorProfileLtrStyle.subtitle]}>{I18n.t('medical_app.viewCV')}</Text>
                <Text style={[DoctorCellLtrStyle.ratingText]}>{cvUpdatedString}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={DoctorProfileLtrStyle.schedules}>
          <View style={DoctorProfileLtrStyle.schedule_header}>
            <Text style={DoctorProfileLtrStyle.schedule_header_text}>{I18n.t('program')}</Text>
          </View>
          {
            schedule.map(schedule =>
              <View style={DoctorProfileLtrStyle.day_schedule}>
                <Text style={DoctorProfileLtrStyle.day_schedule_title}>{I18n.t('day_' + schedule.day)}</Text>
                <Text
                  style={DoctorProfileLtrStyle.day_schedule_value}>{schedule.interval !== null ? schedule.interval : I18n.t('free_schedule')}</Text>
              </View>)
          }
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
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
        rightComponent={rightComponent}
      />
      <ScrollView>
        <View>{renderHeader()}</View>
        <View style={[DoctorCellLtrStyle.wrapper, {margin: Metrics.doubleBaseMargin, flex: 1}]}>
          <Text style={[DoctorProfileLtrStyle.reviewHeader]}>{I18n.t('reviews')}</Text>
          <FlatList
            keyExtractor={keyExtractor}
            ListEmptyComponent={noDataView('medical_app.no_reviews')}
            data={reviews}
            renderItem={renderItem}
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
        </View>
      </ScrollView>
      <View style={DoctorProfileLtrStyle.bottomButtons}>
        <RegularButton
          title={I18n.t('new_schedule')}
          icon={<CustomIcons
            name='calendar'
            size={17}
            color={Colors.black}
          />}
          onPress={() => navigation.navigate('ScheduleCalendar', {specialization, imgUrl, firstName, lastName, name, price })}
          buttonStyle={[
            GlobalLtrStyle.buttonStyle,
            {
              backgroundColor: '#ebebeb',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 7,
              borderBottomLeftRadius: 7,
            },
          ]}
          titleStyle={{color: 'black', fontSize: Fonts.small}}
          containerStyle={{paddingLeft: 20, width:'30%', justifyContent: 'center', alignItems: 'center'}}
        />
        <RegularButton
          title={
            status === 'online'
              ? I18n.t('start_talk')
              : I18n.t('medical_app.doctors_list.let_me_know')
          }
          icon={
            <CustomIcons
              style={{marginRight: 15}}
              name={status === 'online' ? 'audio-call' : 'sound-alert'}
              size={20}
              color={Colors.white}
            />
          }
          onPress={() => console.warn('pressed_call')}
          buttonStyle={[
            GlobalLtrStyle.buttonStyle,
            {
              backgroundColor: status === 'online' ? Colors.green : Colors.darkGrey,
              height: 55,
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          ]}
          titleStyle={{color: 'white', fontSize: Fonts.regular}}
          containerStyle={{paddingRight: 20, width: '70%', justifyContent: 'center', alignItems: 'center'}}
        />
      </View>

    </SafeAreaView>
  );
};

DoctorProfile.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.shape({}),
    }).isRequired,
  }).isRequired,
};

export default DoctorProfile;
