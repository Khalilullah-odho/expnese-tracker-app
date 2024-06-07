import React, {useState} from 'react';
import {Container} from '@/shared';
import {
  Button,
  Colors,
  Image,
  Incubator,
  TextField,
  View,
} from 'react-native-ui-lib';
import {Dimensions, StyleSheet} from 'react-native';
import {useAppNavigation} from '@/hooks';
import apiCall from '@/api';
import localStorage from '@/utils/localStorage';

const {width} = Dimensions.get('window');

type FormData = {
  fullName: string;
  email: string;
  password: string;
  creditBalance: number;
};

const Signup = () => {
  const navigation = useAppNavigation();

  const [data, setData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    creditBalance: 0,
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const onSignup = async () => {
    try {
      const response = await apiCall('post', '/user/register', data);

      localStorage.setToken(response.data?.data.access_token);
      localStorage.setUser(response.data?.data.user);
      navigation.navigate('Dashboard');

      navigation.navigate('Dashboard');
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.data?.errors) {
        const newErrors: any = {};

        error?.response?.data?.data?.errors?.map((err: any) => {
          newErrors[err?.path] = err?.msg;
        });

        setErrors(newErrors);
      }
    }
  };

  const onChangeText = (name: keyof FormData, value: string) => {
    setData({...data, [name]: value});

    setErrors({...errors, [name]: ''});
  };

  return (
    <Container>
      <View width={width} centerH flex backgroundColor={Colors.bg}>
        <View height={120} width={120} marginT-50>
          <Image assetName="logo" style={{width: '100%', height: '100%'}} />
        </View>
        <View flex marginT-50 width={'90%'}>
          <TextField
            placeholder={'Full Name'}
            floatingPlaceholder
            label="Full Name"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 4}}
            onChangeText={value => onChangeText('fullName', value)}
            enableErrors
            validationMessage={errors.fullName}
          />

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
            onChangeText={value => onChangeText('email', value)}
            enableErrors
            validationMessage={errors.email}
          />

          <TextField
            placeholder={'Password'}
            floatingPlaceholder
            label="Password"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 4}}
            secureTextEntry
            onChangeText={value => onChangeText('password', value)}
            enableErrors
            validationMessage={errors.password}
          />

          <TextField
            placeholder={'Credit Balance'}
            floatingPlaceholder
            label="Credit Balance"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 4}}
            inputMode="numeric"
            onChangeText={value => onChangeText('creditBalance', value)}
            returnKeyType="done"
          />

          <Button
            onPress={onSignup}
            label="Signup"
            marginT-40
            color={Colors.white}
            backgroundColor={Colors.primary}
          />
        </View>
      </View>
    </Container>
  );
};

export default Signup;

const styles = StyleSheet.create({
  fieldStyle: {
    borderColor: Colors.primary,
    borderBottomWidth: 1,
  },
});
