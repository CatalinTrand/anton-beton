import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import { PropTypes } from 'prop-types';
import I18n from '../../../shared/I18n/I18n';
import { CURRENCY } from '../../../shared/constants/stringConstants.json';
import { Colors, CustomIcons, Fonts, Metrics } from '../../../shared/themes';
import DoctorCellLtrStyle from '../../../shared/styles/doctorCell.ltr.styles';
import UserAvatar from '../../../shared/components/sections/userAvatar';

const DoctorCell = ({ navigation, item }) => {
  const {
    status,
    imgUrl,
    firstName,
    lastName,
    name,
    rating,
    reviewsNumber,
    price,
    isFavorite,
  } = item;
  const ratingString = `${rating} (${reviewsNumber})`;
  const [favorite, setFavorite] = useState(isFavorite);
  const renderStatus = () => {
    const onPress = () => {
      if (status === 'online') {
        console.warn('make call');
      } else {
        console.warn('let me know');
      }
    };
    return (
      <View
        style={[
          DoctorCellLtrStyle.wrapperRow,
          { margin: 0, borderTopWidth: 1, borderTopColor: Colors.grey },
        ]}
      >
        <TouchableOpacity
          onPress={() => console.warn('share')}
          style={[DoctorCellLtrStyle.iconWrapper, { width: '30%' }]}
        >
          <CustomIcons name="share" color={Colors.black} size={Fonts.medium} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress}
          style={[
            DoctorCellLtrStyle.iconWrapper,
            {
              width: '70%',
              borderLeftColor: Colors.grey,
              borderLeftWidth: 1,
              flexDirection: 'row',
            },
          ]}
        >
          <CustomIcons
            name={status === 'online' ? 'audio-call' : 'sound-alert'}
            color={status === 'online' ? Colors.green : Colors.black}
            size={Fonts.medium}
          />
          <Text
            style={{ marginLeft: 10, color: status === 'online' ? Colors.green : Colors.black }}
          >
            {status === 'online'
              ? I18n.t('start_talk')
              : I18n.t('medical_app.doctors_list.let_me_know')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const priceString = `${CURRENCY} ${price}`;
  return (
    <View style={[DoctorCellLtrStyle.wrapper, { paddingTop: Metrics.baseMargin }]}>
      <View style={[DoctorCellLtrStyle.wrapperRow]}>
        <View
          style={[
            DoctorCellLtrStyle.avatar,
            status === 'online'
              ? { borderWidth: 2, borderColor: Colors.green }
              : { borderWidth: 2, borderColor: Colors.grey },
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
          <View style={[DoctorCellLtrStyle.ratingRow]}>
            <CustomIcons name="star" size={Fonts.small} color={Colors.darkGrey} />
            <Text style={[DoctorCellLtrStyle.ratingText]}>{ratingString}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorProfile', { data: item })}>
            <Text style={[DoctorCellLtrStyle.name]}>{name}</Text>
          </TouchableOpacity>
          <Text style={{ color: Colors.orange }}>{priceString}</Text>
        </View>
      </View>
      {renderStatus()}
      <TouchableOpacity style={DoctorCellLtrStyle.options} onPress={() => setFavorite(!favorite)}>
        <CustomIcons
          size={Fonts.regular}
          color={favorite ? Colors.orange : Colors.black}
          name={favorite ? 'filled-heart' : 'heart'}
        />
      </TouchableOpacity>
    </View>
  );
};

DoctorCell.defaultProps = {
  item: PropTypes.shape({
    imgUrl: '',
  }),
};
DoctorCell.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewsNumber: PropTypes.number.isRequired,
  }),
};

export default DoctorCell;
