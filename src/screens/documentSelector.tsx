import DocumentSelectorLtrStyle from '../../shared/styles/documentSelector.ltr.style';
import Colors from "../../shared/themes/Colors";
import Header from "../components/sections/header";
import {CustomIcons} from "../../shared/themes";
import Fonts from "../../shared/themes/Fonts";
import {SafeAreaView, Text, View, ScrollView, CheckBox} from "react-native";
import I18n from "../../shared/I18n/I18n";
import UserAvatar from "../../shared/components/sections/userAvatar";
import Metrics from "../../shared/themes/Metrics";
import * as React from "react";
import GlobalLtrStyle from "../../shared/styles/global.ltr.style";
import RegularButton from "../../shared/components/buttons/regularButton";
import {useState} from "react";
import {string} from "prop-types";
import {TouchableOpacity} from "react-native-gesture-handler";

const DocumentSelector = ({route, navigation}) => {

  const {time, date, pacient, doctor} = route.params;

  const documents = [
    { //sunt grupate pe luni
      year: 2020,
      month: 5,
      files: [
        {
          id: 1,
          name: "Investigatii",
          type: 1 //type 1 investigatie, type 2 analiza, type 3 radiografie
        },
        {
          id: 2,
          name: "Analize_07052019",
          date: "07-05-2020",
          type: 2
        }
      ]
    },
    {
      year: 2019,
      month: 1,
      files: [
        {
          id: 3,
          name: "Investigatii",
          type: 1
        },
        {
          id: 4,
          name: "Radiografie lombara",
          date: "15-01-2019",
          type: 3
        },
        {
          id: 5,
          name: "Radiografie vertebra 6",
          date: "12-01-2019",
          type: 3
        }
      ]
    }
  ];

  const getIconName = (type) => {
    switch (type) {
      case 1:
        return "radio-checked";
      case 2:
        return "document";
      case 3:
        return "document";
      default:
        return "document";
    }
  };

  const prettyDate = (date) => {
    let day = date.split('-')[0];
    if (day.length == 2 && day[0] == '0')
      day = day.substring(1);
    let month = date.split('-')[1];
    if (month.length == 2 && month[0] == '0')
      month = month.substring(1);
    let year = date.split('-')[2];

    return day + " " + I18n.t('month_' + month) + " " + year;
  };

  const [selectedFiles, setSelectedFiles] = useState([] as any);

  const isSelected = (id) => {
    return selectedFiles.indexOf(id) > -1;
  };

  const setSelection = (id) => {
    console.log(id, selectedFiles);
    const newFiles = [...selectedFiles];
    const index = newFiles.indexOf(id);
    if (index > -1) {
      newFiles.splice(index, 1);
    } else
      newFiles.push(id);

    console.log(newFiles);
    setSelectedFiles(newFiles);
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
        centerComponent={null}
        rightComponent={null}
        noBorder={true}
      />
      <ScrollView>
        <View style={{marginTop: 10}}>
          <View style={DocumentSelectorLtrStyle.header_text}>
            <Text style={DocumentSelectorLtrStyle.header_step_text}>{I18n.t('step').toUpperCase()} 3/4</Text>
            <Text style={DocumentSelectorLtrStyle.header_schedule_text}>{I18n.t('documents')}</Text>
          </View>
          <View style={DocumentSelectorLtrStyle.profile_list}>
            <View style={DocumentSelectorLtrStyle.profile_details}>
              <View style={DocumentSelectorLtrStyle.profile_details_left}>
                <UserAvatar
                  imageURL={pacient.imgUrl}
                  firstName={pacient.firstName}
                  lastName={pacient.lastName}
                  theme={Colors.borderGrey}
                  size={Metrics.icons.xl}
                />
              </View>
              <View style={DocumentSelectorLtrStyle.profile_details_right}>
                <Text style={DocumentSelectorLtrStyle.profile_details_name}>{pacient.name}</Text>
                <Text
                  style={DocumentSelectorLtrStyle.profile_details_specialization}>{pacient.age} {I18n.t('years')} - {pacient.age > 18 ? I18n.t('adult') : I18n.t('child')}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[DocumentSelectorLtrStyle.documents_list, {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }]}>
          {
            documents.map((document, idx) =>
              <View key={idx} style={DocumentSelectorLtrStyle.documents_month}>
                <Text
                  style={DocumentSelectorLtrStyle.documents_month_header}>{I18n.t('month_' + document.month).toUpperCase()} {document.year}</Text>
                <View style={DocumentSelectorLtrStyle.file_list}>
                  {
                    document.files.map((file, idx) =>
                      <View key={idx} style={DocumentSelectorLtrStyle.file}>
                        <View style={DocumentSelectorLtrStyle.file_left}>
                          <CustomIcons
                            size={file.type == 1 ? Fonts.medium : Fonts.h5}
                            color={Colors.black}
                            name={getIconName(file.type)}
                          />
                          <View style={DocumentSelectorLtrStyle.file_details}>
                            <Text
                              style={file.type == 1 ? DocumentSelectorLtrStyle.file_name_investigation : DocumentSelectorLtrStyle.file_name}>{file.name}</Text>
                            {file.date ?
                              <Text style={DocumentSelectorLtrStyle.file_date}>{prettyDate(file.date)}</Text> : null}
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => setSelection(file.id)}>
                          <CheckBox
                            value={isSelected(file.id)}
                            style={DocumentSelectorLtrStyle.checkbox}
                          />
                        </TouchableOpacity>
                      </View>)
                  }
                </View>
              </View>
            )
          }
        </View>
      </ScrollView>
      <RegularButton
        title={I18n.t('go_to_last_step')}
        onPress={() => navigation.navigate('PaymentScreen', {doctor, pacient, date, time, documents: selectedFiles})}
        buttonStyle={[
          GlobalLtrStyle.buttonStyle,
          {
            backgroundColor: Colors.orange,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderRadius: 7,
          },
        ]}
        titleStyle={{color: 'white', fontSize: Fonts.regular}}
        containerStyle={{marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
      />
    </SafeAreaView>
  );
};

export default DocumentSelector;
