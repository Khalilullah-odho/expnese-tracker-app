import {useAppNavigation} from '@/hooks';
import {Container, Header} from '@/shared';
import localStorage from '@/utils/localStorage';
import {StyleSheet} from 'react-native';
import {
  Button,
  Colors,
  KeyboardAwareScrollView,
  Text,
  View,
} from 'react-native-ui-lib';

const Profile = () => {
  const navigation = useAppNavigation();
  const user = localStorage.getUser() as any;

  const onLogout = () => {
    localStorage.removeToken();
    localStorage.removeUser();
    navigation.reset({index: 0, routes: [{name: 'AuthNavigator'}]});
  };

  return (
    <Container>
      <Header goBack title="User Profile" />
      <View backgroundColor={Colors.bg} marginT>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}>
          <View marginV-10>
            <Text style={styles.key} grey20>
              Full Name
            </Text>
            <Text style={styles.value} black>
              {user.full_name}
            </Text>
          </View>
          <View marginV-10>
            <Text style={styles.key} grey20>
              Email Address
            </Text>
            <Text style={styles.value} black>
              {user?.email_address}
            </Text>
          </View>
          <View marginV-10>
            <Text style={styles.key} grey20>
              Total Credit
            </Text>
            <Text style={styles.value} black>
              {user?.total_credit}
            </Text>
          </View>

          <View marginV-10>
            <Text style={styles.key} grey20>
              Remaining Credit
            </Text>
            <Text style={styles.value} black>
              {user?.credit_balance}
            </Text>
          </View>
          <View marginT-40>
            <Button
              onPress={onLogout}
              style={styles.btn}
              label="Logout"
              size="medium"
              backgroundColor={Colors.$iconDanger}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },

  key: {
    fontSize: 14,
    fontWeight: 'normal',
  },

  value: {
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 3,
  },

  btn: {
    width: '100%',
  },
});
