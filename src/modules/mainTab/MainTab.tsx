import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {launchImageLibrary} from 'react-native-image-picker';

import Home from '../home/Home';
import Shop from '../shop/Shop';
import Mine from '../mine/Mine';
import Message from '../message/Message';

import icon_tab_publish from '../../assets/icon_tab_publish.png';

const BottomTab = createBottomTabNavigator();
export default () => {
  const RedBookTabBar = ({
    state,
    descriptors,
    navigation,
  }: BottomTabBarProps) => {
    const {routes, index} = state;

    const onPublishPress = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          includeBase64: true,
        },
        (response): void => {
          const {assets} = response;
          if (assets?.length === 0) {
            console.log('assets is empty');
            return;
          } else {
            // @ts-ignore
            const {uri, width, height, fileName, fileSize, type} = assets[0];
            console.log('uri', uri);
            console.log('width', width);
            console.log('height', height);
            console.log('fileName', fileName);
            console.log('fileSize', fileSize);
            console.log('type', type);
          }
        },
      );
    };

    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route: any, idx: number) => {
          const {options} = descriptors[route.key];
          const label = options.title;
          const isFocused = index === idx;
          if (idx === 2) {
            return (
              <TouchableOpacity
                key={label}
                style={styles.tabItem}
                onPress={onPublishPress}>
                <Image
                  style={styles.icon_tab_publish}
                  source={icon_tab_publish}
                />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={label}
              style={styles.tabItem}
              onPress={() => {
                navigation.navigate(route.name);
              }}>
              <Text
                style={{
                  fontSize: isFocused ? 19 : 16,
                  color: isFocused ? '#333' : '#999',
                  fontWeight: 'bold',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <BottomTab.Navigator tabBar={props => <RedBookTabBar {...props} />}>
        <BottomTab.Screen
          name={'Home'}
          component={Home}
          options={{
            title: '首页',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name={'Shop'}
          component={Shop}
          options={{
            title: '购物',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name={'Publish'}
          component={Shop}
          options={{
            title: '发布',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name={'Message'}
          component={Message}
          options={{
            title: '消息',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name={'Mine'}
          component={Mine}
          options={{
            title: '我',
            headerShown: false,
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_tab_publish: {
    width: 58,
    height: 40,
    resizeMode: 'contain',
  },
});
