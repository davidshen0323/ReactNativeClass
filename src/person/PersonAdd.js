import React, {useState} from 'react';
import { Button , TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function PersonAdd(props) {

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);
  
  function update(){
    async function sendData(){

        const newPerson={
            fields:{
                Name:name,
                City:city,
                Age:parseInt(age)
            }
        }
        console.log(newPerson)
        const axios_config = {
            headers: {
                'Authorization': 'Bearer keys9gKjERVN7YgGk',
                'Content-Type': 'application/json'}
            }
        ;
        try {

            const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Student?maxRecords=3&view=Grid%20view";
            const result = await axios.post(url,newPerson, axios_config);
            console.log(result);
            //setPersons(result.data.records);
            props.update();}
            catch (e){
              console.log("error:"+e);
            }
        }
          sendData();
        
        }
        
  return (
    <Modal visible={props.modalVisible}>
    
    <SafeAreaView>
    <TextInput placeholder="姓名" value={name} onChangeText={text=>setName(text)}/>
    <TextInput placeholder="城市" value={city} onChangeText={text=>setCity(text)}/>
    <TextInput placeholder="年齡" value={age} onChangeText={text=>setAge(text)}/>
    <Button onPress={update} title="新增"/>
    </SafeAreaView>

    </Modal>
  );

}