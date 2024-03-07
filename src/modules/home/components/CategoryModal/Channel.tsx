import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import icon_arrow from '../../../../assets/icon_arrow.png';
import icon_delete from '../../../../assets/icon_delete.png';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type Props = {
  list: Category[];
  title: string;
  subTitle: string;
  needEdit?: boolean;
  marginTop?: number;
  onItemRemove?: (item: Category) => void;
};
export default (props: Props) => {
  const {list, title, subTitle, onItemRemove} = props;
  const [componentList, setComponentList] = useState<Category[]>(list);
  let needEdit = !!props.needEdit;
  let marginTop = props.marginTop || 0;

  const [edit, setEdit] = useState<boolean>(false);

  const itemPress = useCallback(
    (item: Category, index: number) => () => {
      if (!edit) {
        return;
      }
      const newEditList = componentList.filter(i => i.name !== item.name);
      console.log(newEditList, item.name);
      setComponentList(newEditList);
      onItemRemove?.(item);
    },
    [],
  );

  return componentList?.length > 0 ? (
    <>
      <View style={[styles.row, {marginTop}]}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subTitleText}>{subTitle}</Text>
        {needEdit ? (
          <>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEdit(!edit);
              }}>
              <Text style={styles.editText}>
                {edit ? '完成编辑' : '进入编辑'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton}>
              <Image style={styles.closeImg} source={icon_arrow} />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
      <View style={styles.listContent}>
        {componentList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={
                item.default && needEdit
                  ? styles.itemLayoutDefault
                  : styles.itemLayout
              }
              onPress={itemPress(item, index)}>
              <Text style={styles.itemText}>
                {needEdit ? item.name : '+ ' + item.name}
              </Text>
              {edit && !item.default && (
                <Image style={styles.deleteImg} source={icon_delete} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  ) : null;
};

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
});
