import {StackParamList} from '@/appNavigators';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const useAppNavigation = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return navigation;
};

export default useAppNavigation;
