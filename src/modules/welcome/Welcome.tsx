import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import icon_main_logo from '../../assets/icon_main_logo.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/Storage';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 2000);
  }, []);
  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo');
    if (cacheUserInfo && JSON.parse(cacheUserInfo)) {
      startHome();
    } else {
      startLogin();
    }
  };

  const startLogin = () => {
    navigation.replace('Login');
  };

  const startHome = () => {
    navigation.replace('HomeTab');
  };
  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={icon_main_logo} />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_main: {
    width: 200,
    height: 90,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
