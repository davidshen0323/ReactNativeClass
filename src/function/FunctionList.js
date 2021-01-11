import React from "react";

import { Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignOut from "../account/SignOut";
import HandsUp from "../HandsUp/HandsUpChoose";
import Announcement from "../announcement/Announcement";
import Comment from "../commentbox/Commentbox";


const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function FunctionList({ route }) {

  const { Csid } = route.params;
 
  const Tab = createBottomTabNavigator();

  console.log(Csid);

  return (

    //如果要顯示出來要用這個!!
    // <View>
    //   <Text>csid: {JSON.stringify(Csid)}</Text> 
    // </View>

    <Tab.Navigator>
      <Tab.Screen name="HandsUp" component={HandsUp} />
      <Tab.Screen name="Announcement" component={Announcement} />
      <Tab.Screen name="Comment" component={Comment} />
      <Tab.Screen name="SignOut" component={SignOut} />
    </Tab.Navigator>
  );
}
