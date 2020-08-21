import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
import Colors from './Colors';
import Fonts from './Fonts';
import Images from './Images';
import Metrics from './Metrics';

const CustomIcons = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
export { Colors, Fonts, Images, Metrics, CustomIcons };
