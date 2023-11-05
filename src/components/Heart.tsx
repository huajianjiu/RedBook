import React, {useEffect, useRef, useState} from 'react';
import {Image, TouchableOpacity, StyleSheet, Animated} from 'react-native';

import icon_heart from '../assets/icon_heart.png';
import icon_heart_empty from '../assets/icon_heart_empty.png';

type Props = {
  value: boolean;
  size?: number;
  onValueChange?: (value: boolean) => void;
};

export default (props: Props) => {
  const {value, onValueChange, size = 18} = props;

  const [showState, setShowState] = useState(false);

  const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
  const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    setShowState(value);
  }, [value]);

  const onHeartPress = () => {
    const newState = !showState;
    setShowState(newState);
    onValueChange?.(newState);
    if (newState) {
      alpha.setValue(1);
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.8,
        duration: 300,
        useNativeDriver: false,
      });
      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        delay: 200,
      });
      Animated.parallel([scaleAnim, alphaAnim]).start();
    } else {
      scale.setValue(0);
      alpha.setValue(0);
    }
  };

  return (
    <TouchableOpacity onPress={onHeartPress}>
      <Image
        style={(styles.container, {width: size, height: size})}
        source={showState ? icon_heart : icon_heart_empty}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 20,
          position: 'absolute',
          borderColor: '#ff2442',
          transform: [{scale}],
          opacity: alpha,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
  },
});
