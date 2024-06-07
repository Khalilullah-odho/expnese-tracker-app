import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import Login from '@/features/auth/login';
import Signup from '@/features/auth/signup';
import Dashboard from '@/features/home/dashboard';
import localStorage from '@/utils/localStorage';
import AddExpense from '@/features/home/addExpense';
import ExpenseDetails from '@/features/home/expenseDetails';
import Profile from '@/features/home/profile';

import BootSplash from 'react-native-bootsplash';

export interface StackParamList {
  AuthNavigator: {
    Login: undefined;
    Signup: undefined;
  };

  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  AddExpense: {itemData?: any};
  ExpenseDetails: {
    id: number;
    title: string;
  };

  Profile: undefined;
}

const Stack = createNativeStackNavigator<StackParamList | any>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide()}>
      <Stack.Navigator
        initialRouteName={
          localStorage.getToken() ? 'Dashboard' : 'AuthNavigator'
        }
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
