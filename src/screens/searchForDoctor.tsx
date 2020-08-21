import React, { useState } from 'react';
import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../components/sections/header';
import { Colors, CustomIcons, Fonts, Images, Metrics } from '../../shared/themes';
import loginPageStyle from '../../shared/styles/auth.ltr.style';
import GlobalLtrStyle from '../../shared/styles/global.ltr.style';
import DoctorProfileLtrStyle from '../../shared/styles/doctorProfile.ltr.style';
import I18n from '../../shared/I18n/I18n';
import HomePageLtrStyle from '../../shared/styles/homePage.ltr.style';
import DoctorCellLtrStyle from '../../shared/styles/doctorCell.ltr.styles';
import UserAvatar from '../../shared/components/sections/userAvatar';

const SearchDoctorScreen = ({ navigation }): JSX.Element => {
  const foundDoctor = {
    id: 2,
    name: 'Dr. Maria Luminita',
    firstName: 'Luminita',
    lastName: 'Maria',
    rating: 5.0,
    reviewsNumber: 83,
    urgentPrice: 150,
    specialization: 'neurologie',
    title: 'medic primar',
    status: 'offline',
    imgUrl: 'https://specials-images.forbesimg.com/imageserve/1139665860/960x0.jpg?fit=scale',
  };
  const advices = [
    {
      id: 1,
      text: 'Pregătește întrebările pentru medicul tău cât timp aștepți discuția',
    },
    {
      id: 2,
      text: 'Lorem ipsum',
    },
    {
      id: 3,
      text: 'dolor est',
    },
  ];
  const ratingString = `${foundDoctor.rating} (${foundDoctor.reviewsNumber})`;
  const [activeIndex, setActiveIndex] = useState(0);
  const searching = false;
  const renderSearching = () => {
    return (
      <>
        <Image style={HomePageLtrStyle.homepageImage} source={Images.searching} />
        <View style={[GlobalLtrStyle.borderedRow, { width: '100%' }]}>
          <ActivityIndicator size="small" color={Colors.orange} />
          <Text style={[{ color: Colors.black, fontWeight: 'bold', marginLeft: 10 }]}>
            {I18n.t('searching_dr')}
          </Text>
        </View>
      </>
    );
  };
  const renderFound = () => {
    return (
      <View style={[GlobalLtrStyle.column, GlobalLtrStyle.centeredView]}>
        <View
          style={[
            DoctorCellLtrStyle.avatar,
            { marginRight: 0 },
            foundDoctor.status === 'online'
              ? { borderWidth: 2, borderColor: Colors.green }
              : { borderWidth: 2, borderColor: Colors.grey },
          ]}
        >
          <UserAvatar
            imageURL={foundDoctor.imgUrl}
            firstName={foundDoctor.firstName}
            lastName={foundDoctor.lastName}
            theme={Colors.borderGrey}
            size={Metrics.avatarWidthBigger}
          />
        </View>
        <Text
          style={[
            DoctorCellLtrStyle.specialization,
            { marginTop: Metrics.doubleBaseMargin, textAlign: 'center' },
          ]}
        >
          {foundDoctor.title}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DoctorProfile', { data: foundDoctor })}
        >
          <Text style={[DoctorCellLtrStyle.name, { textAlign: 'center', marginRight: 0 }]}>
            {foundDoctor.name}
          </Text>
        </TouchableOpacity>
        <View style={[DoctorCellLtrStyle.ratingRow, { justifyContent: 'center' }]}>
          <CustomIcons name="star" size={Fonts.small} color={Colors.darkGrey} />
          <Text style={[DoctorCellLtrStyle.ratingText]}>{ratingString}</Text>
        </View>
        <View
          style={[
            GlobalLtrStyle.borderedRow,
            {
              width: '100%',
              justifyContent: 'space-between',
              marginTop: Metrics.doubleBaseMargin * 2,
            },
          ]}
        >
          <Text style={[{ color: Colors.black, fontWeight: 'bold', marginRight: 10 }]}>
            {I18n.t('starting_call')}
          </Text>
          <Text style={[{ color: Colors.green, fontWeight: 'bold', fontSize: Fonts.h6 }]}>
            4:35
          </Text>
        </View>
        <View
          style={[
            GlobalLtrStyle.borderedRow,
            {
              width: '100%',
              marginTop: Metrics.doubleBaseMargin,
            },
          ]}
        >
          <View style={[GlobalLtrStyle.column, { width: '100%' }]}>
            <View
              style={[
                GlobalLtrStyle.row,
                {
                  justifyContent: 'space-between',
                  marginBottom: Metrics.baseMargin,
                },
              ]}
            >
              <Text
                style={[
                  {
                    color: Colors.grey,
                    fontWeight: 'bold',
                    marginRight: 10,
                    textTransform: 'uppercase',
                  },
                ]}
              >
                {I18n.t('advices')}
              </Text>
              <View style={[GlobalLtrStyle.row]}>
                {advices &&
                  advices.map((item, index) => {
                    return (
                      <TouchableOpacity key={item.id} onPress={() => setActiveIndex(index)}>
                        <View
                          style={[
                            HomePageLtrStyle.circle,
                            {
                              width: 10,
                              height: 10,
                              backgroundColor:
                                activeIndex === index ? Colors.darkGrey : Colors.borderGrey,
                              marginHorizontal: 2,
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
            <View>
              {advices &&
                advices.map((row, index) => {
                  return (
                    activeIndex === index && (
                      <Text key={row.id} style={{ color: Colors.darkGrey }}>
                        {row.text}
                      </Text>
                    )
                  );
                })}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <Header
        leftComponent={
          <CustomIcons
            size={Fonts.medium}
            color={Colors.black}
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <Text style={GlobalLtrStyle.headerText}>
            {I18n.t(searching ? 'video_talk' : 'waiting_call')}
          </Text>
        }
      />
      <View style={loginPageStyle.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={GlobalLtrStyle.centeredView}>
            {searching ? renderSearching() : renderFound()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default SearchDoctorScreen;
