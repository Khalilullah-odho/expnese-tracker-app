import React, {useEffect} from 'react';
import RNUIThemeInit from '@/theme';
import AppNavigator from '@/appNavigators';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    RNUIThemeInit();
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
