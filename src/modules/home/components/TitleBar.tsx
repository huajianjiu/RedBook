import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';

type Props = {
  tab: number;
  onTabChange: (tab: number) => void;
};
export default ({tab, onTabChange}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  useEffect(() => {
    setTabIndex(tab);
  }, [tab]);
  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyButton}>
        <Image style={styles.icon} source={icon_daily} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(0);
          onTabChange?.(0);
        }}>
        <Text style={tabIndex == 0 ? styles.tabTextSelected : styles.tabText}>
          关注
        </Text>
        {tabIndex === 0 && <View style={styles.line} />}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(1);
          onTabChange?.(1);
        }}>
        <Text style={tabIndex == 1 ? styles.tabTextSelected : styles.tabText}>
          发现
        </Text>
        {tabIndex === 1 && <View style={styles.line} />}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(2);
          onTabChange?.(2);
        }}>
        <Text style={tabIndex == 2 ? styles.tabTextSelected : styles.tabText}>
          天津
        </Text>
        {tabIndex === 2 && <View style={styles.line} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton}>
        <Image style={styles.icon} source={icon_search} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  icon: {
    width: 26,
    height: 26,
  },
  dailyButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    marginRight: 42,
  },
  searchButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    marginLeft: 42,
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 2,
    position: 'absolute',
    bottom: 6,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#999999',
  },
  tabTextSelected: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
});
