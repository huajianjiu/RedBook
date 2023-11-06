import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Modal,
  StatusBar,
  Dimensions,
} from 'react-native';
import Channel from './Channel';

import icon_arrow from '../../../../assets/icon_arrow.png';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type Props = {
  categoryList: Category[];
};

export interface CategoryModalRef {
  show: () => void;
  hide: () => void;
}
export default forwardRef((props: Props, ref) => {
  const {categoryList} = props;

  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!categoryList) {
      return;
    }
    const list1 = categoryList.filter(i => i.isAdd);
    const list2 = categoryList.filter(i => !i.isAdd);
    setMyList(list1);
    setOtherList(list2);
  }, [categoryList]);
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });
  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={hide}>
      <View style={styles.root}>
        <View style={styles.content}>
          <Channel
            title="我的频道"
            subTitle="点击进入频道"
            needEdit={true}
            list={myList}
          />
          <Channel
            title="推荐频道"
            subTitle="点击添加频道"
            list={otherList}
            marginTop={32}
          />
        </View>
        <View style={styles.mask} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: 48 + (StatusBar.currentHeight || 0),
    paddingBottom: 40,
  },
  mask: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
