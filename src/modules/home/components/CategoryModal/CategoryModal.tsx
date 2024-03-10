import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
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
  LayoutAnimation,
} from 'react-native';
import {save} from '../../../../utils/Storage';

import icon_arrow from '../../../../assets/icon_arrow.png';
import icon_delete from '../../../../assets/icon_delete.png';

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

  const [edit, setEdit] = useState<boolean>(false);

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

  const onMyItemPress = useCallback(
    (item: Category) => {
      if (!edit) {
        return;
      }
      const newMyList = myList.filter(i => i.name !== item.name);
      const copy = {...item, isAdd: false};
      const newOtherList = [...otherList, copy];
      LayoutAnimation.easeInEaseOut();
      setMyList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, myList, otherList],
  );

  const onOtherItemPress = useCallback(
    (item: Category) => {
      if (!edit) {
        return;
      }
      const newOtherList = otherList.filter(i => i.name !== item.name);
      const copy = {...item, isAdd: true};
      const newMyList = [...myList, copy];
      LayoutAnimation.easeInEaseOut();
      setMyList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, myList, otherList],
  );

  const renderMyList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleText}>我的频道</Text>
          <Text style={styles.subTitleText}>点击进入频道</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setEdit(data => {
                if (data) {
                  save(
                    'categoryList',
                    JSON.stringify([...myList, ...otherList]),
                  );
                  return false;
                } else {
                  return true;
                }
              });
            }}>
            <Text style={styles.editText}>
              {edit ? '完成编辑' : '进入编辑'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={hide}>
            <Image style={styles.closeImg} source={icon_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContent}>
          {myList.map(item => {
            return (
              <TouchableOpacity
                key={item.name}
                style={
                  item.default ? styles.itemLayoutDefault : styles.itemLayout
                }
                onPress={() => onMyItemPress(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
                {edit && !item.default && (
                  <Image style={styles.deleteImg} source={icon_delete} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };
  const renderOtherList = () => {
    return (
      <>
        <View style={(styles.row, {marginTop: 32})}>
          <Text style={styles.titleText}>我的频道</Text>
          <Text style={styles.subTitleText}>点击进入频道</Text>
        </View>
        <View style={styles.listContent}>
          {otherList.map(item => {
            return (
              <TouchableOpacity
                style={styles.itemLayout}
                key={item.name}
                onPress={() => onOtherItemPress(item)}>
                <Text style={styles.itemText}>+ {item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={hide}>
      <View style={styles.root}>
        <View style={styles.content}>
          {renderMyList()}
          {renderOtherList()}
        </View>
        <View style={styles.mask} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  subTitleText: {
    fontSize: 13,
    color: '#999999',
    marginLeft: 12,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 14,
    height: 26,
    backgroundColor: '#EEE',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 12,
    color: 'rgb(30, 128, 255)',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 12,
  },
  closeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemLayout: {
    width: (SCREEN_WIDTH - 80) / 4,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#EEE',
    borderRadius: 6,
    marginLeft: 16,
    marginTop: 12,
  },
  itemLayoutDefault: {
    width: (SCREEN_WIDTH - 80) / 4,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE',
    borderRadius: 6,
    marginLeft: 16,
    marginTop: 12,
  },
  itemText: {
    fontSize: 15,
    color: '#666',
  },
  deleteImg: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: -6,
    right: -6,
  },
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
