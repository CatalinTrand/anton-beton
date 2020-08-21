import React, { useState } from 'react';
import { View, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
// @ts-ignore
import { PropTypes } from 'prop-types';

class StyleSheetFactory {
  static getSheet({ transparentBackground, boxBgColor, fullscreen, bottomHalf, modalHeight }) {
    const styles = StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: transparentBackground ?? 'transparent',
      },
      modalWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: '100%',
      },
      modalContainer: {
        backgroundColor: boxBgColor,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderStyle: 'solid',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: '100%',
      },
    });

    if (fullscreen) {
      styles.modalWrapper = {
        ...styles.modalWrapper,
        // @ts-ignore
        flex: 1,
      };

      styles.modalContainer = {
        ...styles.modalContainer,
        // @ts-ignore
        flex: 1,
      };
    } else if (bottomHalf) {
      styles.modalWrapper = {
        ...styles.modalWrapper,
        // @ts-ignore
        marginTop: modalHeight,
      };

      styles.modalContainer = {
        ...styles.modalContainer,
        // @ts-ignore
        flex: 1,
      };
    } else {
      styles.modalWrapper = {
        ...styles.modalWrapper,
        // @ts-ignore
        flex: 1,
      };

      styles.modalContainer = {
        ...styles.modalContainer,
        // @ts-ignore
        marginHorizontal: 10,
      };
    }

    return styles;
  }
}

const CustomModal = (props) => {
  const { height } = Dimensions.get('window');
  const {
    boxBackgroundColor,
    fullscreen,
    animation,
    mode,
    bottomHalf,
    visible,
    children,
    transparentContainer,
    outsideClick,
    transparentBackground,
  } = props;
  const [modalHeight] = useState(bottomHalf ? height / 3 : height);
  const styles = StyleSheetFactory.getSheet({
    boxBgColor: boxBackgroundColor,
    fullscreen,
    modalHeight,
    bottomHalf,
    transparentBackground,
  });
  return (
    <Modal
      animationType={animation}
      transparent={transparentContainer}
      visible={visible}
      presentationStyle={mode}
    >
      <TouchableWithoutFeedback onPress={outsideClick}>
        <View style={styles.mainContainer}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>{children}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
CustomModal.defaultProps = {
  fullscreen: false,
};
CustomModal.propTypes = {
  boxBackgroundColor: PropTypes.string.isRequired,
  fullscreen: PropTypes.bool,
  animation: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  bottomHalf: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  transparentContainer: PropTypes.bool.isRequired,
  outsideClick: PropTypes.func.isRequired,
  transparentBackground: PropTypes.string.isRequired,
};
export default CustomModal;
