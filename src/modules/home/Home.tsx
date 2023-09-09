import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
export default () => {
  return (
    <View style={styles.root}>
      <Text style={{fontSize: 40, color: 'red'}}>首页</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
