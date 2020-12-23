import React, {useState, useEffect, useRef } from 'react';
import {View, Text,Button, Platform  } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PersonList from './src/person/PersonList';
import ProductList from './src/product/ProductList';
import SignIn from './src/account/SignIn';
import SignOut from './src/account/SignOut';
import SignUp from './src/account/SignUp';
import Announcement from './src/announcement/Announcement';
import Click from './Click';
// import * as SecureStore from 'expo-secure-store';
import ImageUpload from './src/storage/ImageUpload';

//push
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

//push
Notifications.setNotificationHandler({

  handleNotification: async () => ({

    shouldShowAlert: true,

    shouldPlaySound: false,

    shouldSetBadge: false,

  }),

});
//push


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home(){
  return(
      <Tab.Navigator>
        <Tab.Screen name="Person" component={PersonList} />
        <Tab.Screen name="Announcement" component={Announcement} />
        <Tab.Screen name="Product" component={ProductList} />
        {/* <Tab.Screen name="Click" component={Click} initialParams={{ count: 10 }}/> */}
        <Tab.Screen name="Image" component={ImageUpload}/>
        <Tab.Screen name="SignOut" component={SignOut} />
      </Tab.Navigator>
  );
}

function Push({route}){
  return(
    <View

    style={{

      flex: 1,

      alignItems: 'center',

      justifyContent: 'space-around',

    }}>

    <Text>Your expo push token: {route.params.expoPushToken}</Text>

    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

      {/* <Text>Title: {notification && notification.request.content.title} </Text>

      <Text>Body: {notification && notification.request.content.body}</Text>

      <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text> */}

    </View>

    <Button

      title="推播！"

      onPress={async () => {

        await sendPushNotification(expoPushToken);

      }}

    />
  </View>
  );
}

function colse(){
  props.colse();
}

function App() {

  //push
  const [expoPushToken, setExpoPushToken] = useState('');

  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();

  const responseListener = useRef();



  useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));



    // This listener is fired whenever a notification is received while the app is foregrounded

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {

      setNotification(notification);

    });



    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

      console.log(response);

    });



    return () => {

      Notifications.removeNotificationSubscription(notificationListener);

      Notifications.removeNotificationSubscription(responseListener);

    };

  }, []);

  //push

  const [count, setCount] = useState(10);
  let countString = "count in App:"+count;
  function updateCount(newCount){
    setCount(newCount);
  }

  return (

    //push
    
    //push


    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="SignIn" component={SignIn} />
    //     <Stack.Screen name="SignUp" component={SignUp} />
    //     <Stack.Screen name="SignOut" component={SignOut} />
    //     <Stack.Screen name="Home" component={Home} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignOut" component={SignOut} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Push" component={Push} initialParams={expoPushToken}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );

}
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications

async function sendPushNotification(expoPushToken) {

  const message = {

    to: expoPushToken,

    sound: 'default',

    title: 'Original Title',

    body: 'And here is the body!',

    data: { data: 'goes here' },

  };



  await fetch('https://exp.host/--/api/v2/push/send', {

    method: 'POST',

    headers: {

      Accept: 'application/json',

      'Accept-encoding': 'gzip, deflate',

      'Content-Type': 'application/json',

    },

    body: JSON.stringify(message),

  });

}



async function registerForPushNotificationsAsync() {

  let token;

  if (Constants.isDevice) {

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      finalStatus = status;

    }

    if (finalStatus !== 'granted') {

      alert('Failed to get push token for push notification!');

      return;

    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    console.log(token);

  } else {

    alert('Must use physical device for Push Notifications');

  }



  if (Platform.OS === 'android') {

    Notifications.setNotificationChannelAsync('default', {

      name: 'default',

      importance: Notifications.AndroidImportance.MAX,

      vibrationPattern: [0, 250, 250, 250],

      lightColor: '#FF231F7C',

    });

  }



  return token;

}

export default App;