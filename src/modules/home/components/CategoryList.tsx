import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import CategoryModal, {CategoryModalRef} from './CategoryModal/CategoryModal';

import icon_arrow from '../../../assets/icon_arrow.png';

type Props = {
  categoryList: Category[];
  allCategoryList: Category[];
  onCategoryChange: (category: Category) => void;
};
export default ({categoryList, allCategoryList, onCategoryChange}: Props) => {
  const modalRef = useRef<CategoryModalRef>(null);
  const [category, setCategory] = useState<Category>(categoryList[0]);
  useEffect(() => {

  }, []);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onCategoryPress = (category: Category) => {
    setCategory(category);
    onCategoryChange?.(category);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {categoryList.map(item => {
          const isSelected = item.name === category?.name;
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.tabItem}
              activeOpacity={1}
              onPress={() => onCategoryPress(item)}>
              <Text
                style={
                  isSelected ? styles.tabItemTextSelected : styles.tabItemText
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        activeOpacity={1}
        onPress={() => {
          modalRef.current?.show();
        }}>
        <Image style={styles.openImg} source={icon_arrow} />
      </TouchableOpacity>

      <CategoryModal ref={modalRef} categoryList={allCategoryList} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 6,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  openButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openImg: {
    width: 18,
    height: 18,
    transform: [{rotate: '-90deg'}],
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: 16,
    color: '#999999',
  },
  tabItemTextSelected: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
});
