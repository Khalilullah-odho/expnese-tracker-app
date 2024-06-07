import {useAppNavigation} from '@/hooks';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {ActionSheet, Colors, Icon, Text, View} from 'react-native-ui-lib';

interface HeaderProps {
  goBack?: boolean;
  home?: boolean;
  title?: string;
  rightElement?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  const [isActionSheet, setIsActionSheet] = useState(false);
  const navigation = useAppNavigation();

  return (
    <View
      row
      centerV
      paddingH-20
      spread
      backgroundColor={Colors.white}
      style={{elevation: 2}}
      height={70}>
      {props?.goBack && (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{width: 25, height: 25}}>
          <Icon assetName="arrowBack" style={{width: '100%', height: '100%'}} />
        </Pressable>
      )}
      {props.title && (
        <Text black flex center style={{fontSize: 16, fontWeight: 'bold'}}>
          {props.title}
        </Text>
      )}
      {props?.home && (
        <>
          <Pressable onPress={() => setIsActionSheet(true)}>
            <Text allowFontScaling={false} black h2>
              Dashboard
            </Text>
          </Pressable>
          <ActionSheet
            onDismiss={() => setIsActionSheet(false)}
            visible={isActionSheet}
            title={'Title'}
            message={'Message goes here'}
            cancelButtonIndex={3}
            destructiveButtonIndex={0}
            options={[
              {label: '', onPress: () => {}},
              {label: '', onPress: () => {}},
              {label: 'Cancel', onPress: () => console.log('cancel')},
            ]}
          />
        </>
      )}

      {props.rightElement && props.rightElement}
    </View>
  );
};

export default Header;
