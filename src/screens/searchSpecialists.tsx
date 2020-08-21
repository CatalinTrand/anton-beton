import React, { useState } from 'react';
// @ts-ignore
import { PropTypes } from 'prop-types';
import { SafeAreaView, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Colors, CustomIcons, Fonts } from '../../shared/themes';
import I18n from '../../shared/I18n/I18n';
import SearchSpecialistsLtrStyle from '../../shared/styles/searchSpecialists.ltr.style';
import noDataView from '../../shared/components/sections/noDataView';
import Header from '../components/sections/header';
import GlobalLtrStyle from '../../shared/styles/global.ltr.style';

const SearchSpecialists = ({ navigation }): JSX.Element => {
  const [refreshing, setRefreshing] = useState(false);
  const categories = [
    {
      id: 1,
      name: 'Neurologie',
      path: 'SpecializationScreen',
    },
    {
      id: 2,
      name: 'Cardiologie',
      path: 'SpecializationScreen',
    },
    {
      id: 3,
      name: 'Ginecologie',
      path: 'SpecializationScreen',
    },
    {
      id: 4,
      name: 'Pediatrie',
      path: 'SpecializationScreen',
    },
    {
      id: 5,
      name: 'Oftalmologie',
      path: 'SpecializationScreen',
    },
    {
      id: 6,
      name: 'Obstetrica',
      path: 'SpecializationScreen',
    },
  ];
  const onListEndReached = () => {
    console.warn('jos');
  };
  const onRefresh = () => {
    console.warn('refresh');
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.path, { data: { name: item.name } })}
        style={[
          SearchSpecialistsLtrStyle.categoryRow,
          item.id === 1 && {
            borderTopColor: Colors.grey,
            borderTopWidth: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          },
          item.id === categories.length && {
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          },
        ]}
      >
        <Text style={SearchSpecialistsLtrStyle.categoryText}>{item.name}</Text>
        <CustomIcons name="arrow-category" color={Colors.black} size={Fonts.medium} />
      </TouchableOpacity>
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  };

  const renderHeader = () => {
    return (
      <View style={SearchSpecialistsLtrStyle.headerWrapper}>
        <Text style={SearchSpecialistsLtrStyle.header}>{I18n.t('medical_app.specialization')}</Text>
      </View>
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
        centerComponent={
          <Text style={GlobalLtrStyle.headerText}>
            {I18n.t('medical_app.home_screen_patient.search_specialist')}
          </Text>
        }
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
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        style={SearchSpecialistsLtrStyle.categoriesWrapper}
        ListHeaderComponent={renderHeader}
        keyExtractor={keyExtractor}
        ListEmptyComponent={noDataView('medical_app.no_categories')}
        data={categories}
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
    </SafeAreaView>
  );
};

export default SearchSpecialists;
