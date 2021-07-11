import * as React from 'react';
import { View, StyleSheet, Dimensions,Text,ImageBackground } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
//import HandsUpLists from './NHandsUpLists';
import HandsUpLists from '../Teacher/THandsUpLists';
import HandsUpFinish from './HandsUpFinish';
 
//const [Csid,setCsid] =useState(props.Csid);
//console.log("選擇的csid"+Csid);


const FirstRoute = () => (
  // <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
  //     <Text>hehe</Text>
  // </View>

      <HandsUpLists/>
);
 
const SecondRoute = () => (
  <HandsUpFinish/>
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function Tab() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '舉手排序' },
    { key: 'second', title: '驗收完成' },
  ]);
 
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
 
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#ff4081',
  },
  backgroundImage: {
    flex: 1,
  },
});

// import React, { Component } from 'react';
// import {
//   Text,
//   View,
// } from 'react-native';
// import {
//   TabNavigator,
// } from 'react-navigation';

// class Page1 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return(
//       <View>
//         <Text>Page_1</Text>
//       </View>
//     );
//   }
// }

// class Page2 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return(
//       <View>
//         <Text>Page_2</Text>
//       </View>
//     );
//   }
// }

// const App = TabNavigator({
//   Page1: { screen: Page1, navigationOptions:{tabBarLabel: '第一頁'}},
//   Page2: { screen: Page2, navigationOptions:{tabBarLabel: '第二頁'}},
//   },{
//   tabBarOptions: {
//     activeTintColor: 'blue',
//     labelStyle: {
//       fontSize: 14,
//     },
//   },
// });

// export default App;

