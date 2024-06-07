import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

const setToken = (token: string) => {
  return mmkv.set('@access_token', token);
};

const getToken = () => {
  const token = mmkv.getString('@access_token');
  return token ? token : null;
};

const removeToken = () => {
  return mmkv.delete('@access_token');
};

const setUser = (user: any) => {
  return mmkv.set('@user', JSON.stringify(user));
};

const getUser = () => {
  const user = mmkv.getString('@user');
  return user ? JSON.parse(user) : {};
};

const updateCreditBalance = (newCredit: number) => {
  const user = getUser();

  user.credit_balance = newCredit;

  setUser(user);
};

const removeUser = () => {
  return mmkv.delete('@user');
};

const setTempItem = (item: any) => {
  return mmkv.set('@temp_item', JSON.stringify(item));
};

const getTempItem = () => {
  const item = mmkv.getString('@temp_item');
  return item ? JSON.parse(item) : null;
};

const removeTempItem = () => {
  return mmkv.delete('@temp_item');
};

const getActionType = (): 'add' | 'delete' | 'update' => {
  const type = mmkv.getString('@action_type');
  return type ? (type as 'add' | 'delete' | 'update') : 'add';
};

const setActionType = (type: 'add' | 'update' | 'delete') => {
  return mmkv.set('@action_type', type);
};

const removeActionType = () => {
  return mmkv.delete('@action_type');
};

export default {
  setToken,
  getToken,
  getTempItem,
  setTempItem,
  removeTempItem,
  getActionType,
  setActionType,
  removeActionType,
  setUser,
  getUser,
  removeUser,
  removeToken,
  updateCreditBalance,
};
