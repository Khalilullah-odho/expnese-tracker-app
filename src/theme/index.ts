import {Typography, Colors, Assets} from 'react-native-ui-lib';

function RNUIThemeInit() {
  Colors.loadColors({
    primary: '#006AF6',
    bg: '#F9F9F9',
    white: '#FFFFFF',
  });

  Typography.loadTypographies({
    h1: {fontSize: 24, fontWeight: '600'},
    h2: {fontSize: 20, fontWeight: '500'},
    h3: {fontSize: 16, fontWeight: '400'},
  });

  Assets.loadAssetsGroup('icons', {
    logo: require('@/assets/images/logo.png'),
    plusIcon: require('@/assets/images/plusIcon.png'),
    arrowBack: require('@/assets/images/arrowBack.png'),
    arrowUp: require('@/assets/images/TransactionType.png'),
    dots: require('@/assets/images/dots.png'),
  });
}

export default RNUIThemeInit;
