import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useLocalStore, observer} from 'mobx-react';
import HomeStore from './HomeStore';
import FlowList from '../../components/flowlist/FlowList.js';
import ResizeImage from '../../components/ResizeImage';
import Heart from '../../components/Heart';
import TitleBar from './components/TitleBar';

import icon_arrow from '../../assets/icon_arrow.png';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
export default observer(() => {
  const store = useLocalStore(() => new HomeStore());
  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
  };
  const loadMore = () => {
    store.requestHomeList();
  };

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <View style={styles.item}>
        <ResizeImage uri={item.image} />
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameText} numberOfLines={1}>
            {item.userName}
          </Text>
          {/*<Image style={styles.iconHeart} source={icon_heart_empty} />*/}
          <Heart
            value={item.isFavorite}
            onValueChange={(value: boolean) => {
              console.log(value);
            }}
          />
          <Text style={styles.countText}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return <Text style={styles.footerText}>没有更多数据</Text>;
  };
  const Header = () => {
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
    });
    const myList = store.categoryList.filter(i => i.isAdd);
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {myList.map((item, index) => {
            return (
              <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.tabItemText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity style={styles.openButton}>
          <Image style={styles.openImg} source={icon_arrow} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <TitleBar
        tab={1}
        onTabChange={tab => {
          console.log(tab);
        }}
      />
      <FlowList
        style={styles.flatList}
        data={store.homeList}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        numColumns={2}
        refreshing={store.refreshing}
        onRefresh={refreshNewData}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        ListFooterComponent={<Footer />}
        ListHeaderComponent={<Header />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  container: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: '#ffffff',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 6,
    flex: 1,
  },
  iconHeart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countText: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 4,
  },
  footerText: {
    width: '100%',
    fontSize: 14,
    color: '#999999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
