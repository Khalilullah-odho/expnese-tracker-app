import {View, Text, SafeAreaView} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors} from 'react-native-ui-lib';

const Container = (props: PropsWithChildren) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bg}}>
      {props.children}
    </SafeAreaView>
  );
};

export default Container;
