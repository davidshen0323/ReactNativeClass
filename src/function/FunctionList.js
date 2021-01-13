import React from "react";

import { Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignOut from "../account/SignOut";

import Announcement from "../announcement/Announcement";
import Comment from "../commentbox/Commentbox";

// import HandsUp from "../Teacher/THandsUpWork";
import HandsUp from "../HandsUp/HandsUpWork";


const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function FunctionList({ route }) {


  const { Csid  } = route.params;
 
  const Tab = createBottomTabNavigator();

  // console.log(Csid);

  return (

    //如果要顯示出來要用這個!!
    // <View>
    //   <Text>csid: {JSON.stringify(Csid)}</Text> 
    // </View>

    <Tab.Navigator>
      <Tab.Screen name="HandsUp" component={HandsUp} initialParams={{Csid}}/>
      <Tab.Screen name="Announcement" component={Announcement} initialParams={{Csid}} />
      <Tab.Screen name="Comment" component={Comment} initialParams={{Csid}}/>
      <Tab.Screen name="SignOut" component={SignOut} />
    </Tab.Navigator>
  );
}