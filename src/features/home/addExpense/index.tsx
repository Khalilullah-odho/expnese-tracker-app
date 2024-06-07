import {Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Header} from '@/shared';
import {
  ActionSheet,
  Button,
  Colors,
  DateTimePicker,
  KeyboardAwareScrollView,
  TextField,
  View,
} from 'react-native-ui-lib';
import apiCall from '@/api';
import {useAppNavigation} from '@/hooks';
import localStorage from '@/utils/localStorage';
import {useRoute} from '@react-navigation/native';

const dateFormat = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const AddExpense = () => {
  const navigation = useAppNavigation();
  const params = useRoute().params as any;

  const [isActionSheet, setIsActionSheet] = useState(false);
  const [categories, setCategories] = useState<{name: string; id: number}[]>(
    [],
  );

  const [addData, setAddData] = useState({
    title: '',
    description: '',
    categoryId: 0,
    amount: 0,
    date: new Date(),
  });

  useEffect(() => {
    const getCategories = async () => {
      const {data} = await apiCall('get', '/category');
      setCategories(data?.data.categories);
    };

    getCategories();

    if (params?.itemData) {
      const updateData: any = {
        title: params?.itemData?.title,
        description: params?.itemData?.description ?? '',
        categoryId: params?.itemData?.category_id,
        amount: params?.itemData?.amount,
        date: new Date(params?.itemData?.date),
      };
      setAddData(updateData);
    }
  }, []);

  const onAddTransaction = async () => {
    try {
      const {data} = await apiCall('post', '/expense', addData);
      localStorage.updateCreditBalance(data?.data.credit_amount);
      localStorage.setTempItem(data?.data.expense);
      localStorage.setActionType('add');
      navigation.goBack();
    } catch (error) {}
  };

  const updateTransaction = async () => {
    const payload = {
      ...addData,
      id: params?.itemData?.id,
      previousAmount: params?.itemData?.amount,
    };

    try {
      const {data} = await apiCall('put', '/expense', payload);
      localStorage.updateCreditBalance(data?.data.credit_amount);
      localStorage.setTempItem(data?.data.expense);
      localStorage.setActionType('update');
      navigation.navigate('Dashboard');
    } catch (error) {}
  };

  const onSubmit = () => {
    if (params?.itemData) {
      updateTransaction();
    } else {
      onAddTransaction();
    }
  };

  return (
    <Container>
      <Header goBack title="Add Transaction" />
      <View paddingH-20 paddingV-10>
        <KeyboardAwareScrollView showVerticalScrollIndicator={false}>
          <TextField
            placeholder={'Title'}
            floatingPlaceholder
            label="Title"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 2}}
            value={addData.title}
            onChangeText={text => setAddData({...addData, title: text})}
          />
          <TextField
            marginT-5
            placeholder={'Description'}
            floatingPlaceholder
            label="Description"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 2}}
            value={addData.description}
            onChangeText={text => setAddData({...addData, description: text})}
          />

          <TextField
            marginT-5
            placeholder={'Amount'}
            floatingPlaceholder
            label="Amount"
            labelColor={Colors.primary}
            color={Colors.black}
            fieldStyle={styles.fieldStyle}
            style={{paddingBottom: 4}}
            inputMode="numeric"
            returnKeyType="done"
            value={addData.amount.toString()}
            onChangeText={text =>
              setAddData({...addData, amount: Number(text)})
            }
          />

          <Pressable
            onPress={() => {
              setIsActionSheet(true);
            }}>
            <TextField
              editable={false}
              marginT-5
              placeholder={'Expense Type'}
              floatingPlaceholder
              label="Expense Type"
              labelColor={Colors.primary}
              color={Colors.black}
              fieldStyle={styles.fieldStyle}
              style={{paddingBottom: 4}}
              value={
                categories.find(item => item.id === addData.categoryId)?.name ??
                ''
              }
            />
            <ActionSheet
              onDismiss={() => setIsActionSheet(false)}
              visible={isActionSheet}
              title={'Expense Type'}
              message={'Message goes here'}
              options={categories.map((category, index) => {
                return {
                  label: category.name,
                  onPress: () => {
                    setAddData({...addData, categoryId: category.id});
                    setIsActionSheet(false);
                  },
                };
              })}
            />
          </Pressable>

          <DateTimePicker
            renderInput={() => (
              <TextField
                marginT-5
                editable={false}
                placeholder={'Date'}
                floatingPlaceholder
                label="Date"
                labelColor={Colors.primary}
                color={Colors.black}
                fieldStyle={styles.fieldStyle}
                style={{paddingBottom: 4}}
                value={addData.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              />
            )}
            style={styles.fieldStyle}
            defaultValue={addData.date.toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            onChange={date => {
              setAddData({
                ...addData,
                date: date,
              });
            }}
            onSelectionChange={e => {
              console.log('onSelectionChange');
            }}
          />

          <Button
            onPress={onSubmit}
            label={params?.itemData ? 'Update Transaction' : 'Add Transaction'}
            marginT-40
            backgroundColor={Colors.primary}
          />
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  fieldStyle: {
    borderColor: Colors.grey50,
    borderBottomWidth: 1,
  },
});
