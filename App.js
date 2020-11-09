import React, {useState} from 'react';
import {View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PersonList from './src/person/PersonList';
import ProductList from './src/product/ProductList';
import SignIn from './src/account/SignIn';
import SignOut from './src/account/SignOut';
import SignUp from './src/account/SignUp';
import Click from './Click';
// import * as SecureStore from 'expo-secure-store';
import ImageUpload from './src/storage/ImageUpload';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home(){
  return(
      <Tab.Navigator>
        <Tab.Screen name="Person" component={PersonList} />
        <Tab.Screen name="Product" component={ProductList} />
        {/* <Tab.Screen name="Click" component={Click} initialParams={{ count: 10 }}/> */}
        <Tab.Screen name="Image" component={ImageUpload}/>
        <Tab.Screen name="SignOut" component={SignOut} />
      </Tab.Navigator>
  );
}

function App() {
  const [count, setCount] = useState(10);
  let countString = "count in App:"+count;
  function updateCount(newCount){
    setCount(newCount);
  }

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignOut" component={SignOut} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

  );

}

export default App;