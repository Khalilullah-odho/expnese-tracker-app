import React, {useState} from 'react';
import {Container} from '@/shared';
import {
  Button,
  ButtonSize,
  Colors,
  Image,
  TextField,
  View,
} from 'react-native-ui-lib';
import {Dimensions, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppNavigation} from '@/hooks';
import apiCall from '@/api';
import localStorage from '@/utils/localStorage';

const {width} = Dimensions.get('window');

const Login = () => {
  const navigation = useAppNavigation();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      const response = await apiCall('post', '/user/login', data);

      localStorage.setToken(response.data?.data.access_token);
      localStorage.setUser(response.data?.data.user);
      navigation.navigate('Dashboard');

      navigation.navigate('Dashboard');
    } catch (error) {}
  };

  return (
    <Container>
      <View width={width} centerH flex backgroundColor={Colors.bg}>
        <View height={120} width={120} marginT-50>
          <Image assetName="logo" style={{width: '100%', height: '100%'}} />
        </View>
        <View flex marginT-50 width={'90%'}>
          <TextField
            placeholder={'Email Address'}
            floatingPlaceholder
            label="Email Address"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 4}}
            inputMode="email"
            keyboardType="email-address"
            onChangeText={text => setData({...data, email: text})}
          />

          <TextField
            marginT-20
            placeholder={'Password'}
            floatingPlaceholder
            label="Password"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 4}}
            secureTextEntry
            onChangeText={text => setData({...data, password: text})}
          />

          <Button
            onPress={onLogin}
            label="Login"
            marginT-40
            color={Colors.white}
            backgroundColor={Colors.primary}
          />
          <Button
            onPress={() => navigation.navigate('Signup')}
            marginT-20
            label="Signup"
            outline
            outlineColor={Colors.transparent}
            size={ButtonSize.medium}
            color={Colors.primary}
          />
        </View>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  fieldStyle: {
    borderColor: Colors.primary,
    borderBottomWidth: 1,
  },
});
