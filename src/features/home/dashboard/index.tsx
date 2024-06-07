import React, {act, useCallback, useEffect, useState} from 'react';
import {Container, Header} from '@/shared';
import {
  Colors,
  View,
  FloatingButton,
  Button,
  Image,
  Text,
  Card,
} from 'react-native-ui-lib';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import {useAppNavigation} from '@/hooks';
import apiCall from '@/api';
import localStorage from '@/utils/localStorage';
import {useIsFocused} from '@react-navigation/native';

export interface Item {
  amount: number;
  category: {id: number; name: string};
  category_id: number;
  date: Date;
  description: string | null;
  id: number;
  title: string;
}

export function formatPriceInPKR(number: number) {
  const formatter = new Intl.NumberFormat('ur-PK', {
    style: 'currency',
    currency: 'PKR', // Set currency to Pakistani Rupee
    minimumFractionDigits: 0, // Display two decimal places
    maximumFractionDigits: 0, // Enforce two decimal places
  });

  return formatter.format(number);
}

const Dashboard = () => {
  const isFocused = useIsFocused();
  const navigation = useAppNavigation();
  const [expenses, setExpenses] = useState<Item[]>([]);

  useEffect(() => {
    const getData = async () => {
      const {data} = await apiCall('get', '/expense');
      setExpenses(data?.data.expenses);
    };

    getData();
  }, []);

  useEffect(() => {
    const tempItem = localStorage.getTempItem();
    if (tempItem) {
      const actionType = localStorage.getActionType();
      if (actionType === 'add') {
        setExpenses([tempItem, ...expenses]);
      } else if (actionType === 'update') {
        setExpenses(prev => {
          const index = prev.findIndex(item => item.id === tempItem.id);
          if (index !== -1) {
            return [
              ...prev.slice(0, index),
              tempItem,
              ...prev.slice(index + 1),
            ];
          }
          return prev; // No change if index is -1
        });
      } else if (actionType === 'delete') {
        setExpenses(prev => {
          return prev.filter(item => item.id !== tempItem.id);
        });
      }
      localStorage.removeActionType();
      localStorage.removeTempItem();
    }
  }, [isFocused]);

  const renderItem = useCallback(
    ({item, index}: {item: Item; index: number}) => {
      return (
        <Card
          onPress={() =>
            navigation.navigate('ExpenseDetails', {
              id: item.id,
              title: item.title,
            })
          }
          height={100}
          row
          centerV
          paddingH-5>
          <View
            center
            style={{
              height: 80,
              width: 80,
              backgroundColor: '#F9F9F9',
              borderRadius: 8,
            }}>
            <Image assetName="arrowUp" style={{width: 40, height: 40}} />
          </View>
          <Card.Section
            flex
            marginL-5
            content={[
              {text: item.title, style: styles.cardTitle},
              {
                text: item.category?.name,
                style: styles.cardCategory,
              },
            ]}
          />
          <Card.Section
            paddingH-10
            content={[
              {
                text: `-${formatPriceInPKR(item.amount)}`,
                style: styles.cardAmount,
              },
              {
                text: new Date(item?.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }),
                style: styles.cardCategory,
              },
            ]}
          />
        </Card>
      );
    },
    [],
  );

  const listHeader = () => {
    const {credit_balance, total_credit} = localStorage.getUser();
    const totalSpent = expenses.reduce((prev, current) => {
      return prev + current.amount;
    }, 0);

    return (
      <View>
        <Card height={70} center>
          <Text grey20>Total Credit</Text>
          <Text $iconSuccess>{formatPriceInPKR(total_credit)}</Text>
        </Card>
        <View row spread marginT-20>
          <Card width={'48%'} height={70} center>
            <Text grey20>Remaining Credit</Text>
            <Text $iconSuccess>{formatPriceInPKR(credit_balance)}</Text>
          </Card>
          <Card width={'48%'} height={70} center>
            <Text grey20>Total Spent</Text>
            <Text $iconDanger>{formatPriceInPKR(totalSpent)}</Text>
          </Card>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <View flex backgroundColor={Colors.bg}>
        <Header
          home
          rightElement={
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={{width: 30, height: 30}}>
              <Image assetName="dots" style={{width: '100%', height: '100%'}} />
            </Pressable>
          }
        />

        <FlatList
          ListHeaderComponent={listHeader}
          data={expenses}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />

        <FloatingButton
          visible
          button={{
            onPress: () => navigation.navigate('AddExpense', {}),
            backgroundColor: Colors.primary,
            style: styles.floatBtn,
            iconSource: () => (
              <View height={30} width={30}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  assetName="plusIcon"
                />
              </View>
            ),
          }}
        />
      </View>
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  floatBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
  },

  contentContainer: {
    flexGrow: 1,
    padding: 10,
    gap: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardCategory: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginTop: 10,
  },

  cardAmount: {
    fontSize: 14,
    color: Colors.$textDanger,
    textAlign: 'right',
  },
});
