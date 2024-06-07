import React, {useEffect, useState} from 'react';
import {Container, Header} from '@/shared';
import {useRoute} from '@react-navigation/native';
import apiCall from '@/api';
import {formatPriceInPKR, Item} from '../dashboard';
import {
  Button,
  Colors,
  KeyboardAwareScrollView,
  Text,
  View,
} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useAppNavigation} from '@/hooks';
import localStorage from '@/utils/localStorage';

interface ExpenseItem extends Item {
  remaining_credit?: number;
  createdAt?: Date;
}

const ExpenseDetails = () => {
  const params = useRoute().params as any;
  const navigation = useAppNavigation();

  const [expense, setExpense] = useState<ExpenseItem>({
    amount: 0,
    category: {id: 0, name: ''},
    category_id: 0,
    date: new Date(),
    description: null,
    id: 0,
    title: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} = await apiCall('get', `expense/${params?.id}`);

        setExpense(data?.data.expense);
      } catch (error) {}
    };

    getData();
  }, [params?.id]);

  const onDelete = async () => {
    try {
      const {data} = await apiCall('delete', `expense/${params?.id}`);

      localStorage.updateCreditBalance(data?.data?.credit_balance);
      localStorage.setActionType('delete');
      localStorage.setTempItem(data?.data.expense);
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <Container>
      <Header goBack title={'Details'} />
      <View backgroundColor={Colors.bg} marginT>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}>
          <View marginV-10>
            <Text style={styles.key} grey20>
              Title
            </Text>
            <Text style={styles.value} black>
              {expense?.title}
            </Text>
          </View>
          <View marginV-10>
            <Text style={styles.key} grey20>
              Amount
            </Text>
            <Text style={styles.value} black>
              {formatPriceInPKR(expense.amount)}
            </Text>
          </View>
          {expense.description && (
            <View marginV-10>
              <Text style={styles.key} grey20>
                Description
              </Text>
              <Text style={styles.value} black>
                {expense?.description}
              </Text>
            </View>
          )}

          <View marginV-10>
            <Text style={styles.key} grey20>
              Transaction Type
            </Text>
            <Text style={styles.value} black>
              {expense?.category.name}
            </Text>
          </View>
          <View marginV-10>
            <Text style={styles.key} grey20>
              When
            </Text>
            <Text style={styles.value} black>
              {new Date(expense.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
              })}
            </Text>
          </View>
          {expense.remaining_credit && (
            <View marginV-10>
              <Text style={styles.key} grey20>
                Remaining Credit
              </Text>
              <Text style={styles.value} black>
                {formatPriceInPKR(expense.remaining_credit)}
              </Text>
            </View>
          )}

          {expense.createdAt && (
            <View marginV-10>
              <Text style={styles.key} grey20>
                Created At
              </Text>
              <Text style={styles.value} black>
                {new Date(expense.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                })}
              </Text>
            </View>
          )}

          <View row centerV spread marginT-40>
            <Button
              onPress={() =>
                navigation.navigate('AddExpense', {itemData: expense})
              }
              style={styles.btn}
              label="Update"
              size="medium"
              backgroundColor={Colors.$iconSuccess}
            />
            <Button
              style={styles.btn}
              label="Delete"
              size="medium"
              onPress={onDelete}
              backgroundColor={Colors.$iconDanger}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
};

export default ExpenseDetails;

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
    width: '48%',
  },
});
