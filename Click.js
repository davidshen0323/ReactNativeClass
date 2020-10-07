import React, {useState, useEffect} from 'react';
import {Alert, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Click() {

  const [count, setCount] = useState(0);

  let countString = "count:"+count;

  function showCount(){
    Alert.alert("count:"+count);

  }

  useEffect(showCount);

  return (
    <SafeAreaView>
    <Button title={countString} onPress={()=>setCount(count+1)}/>
    </SafeAreaView>
  );

}