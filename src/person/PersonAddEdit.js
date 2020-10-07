import React, { useState, useEffect } from 'react';
import { Button, TextInput, Modal } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PersonAddEdit(props) {

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    //transfer age to a string for TextInput 
    const [age, setAge] = useState("0");

    useEffect(() => {
        setName(props.person.Name);
        setCity(props.person.City);
        setAge("" + props.person.Age);
    }, [props.id]);

    function update() {

        async function sendData() {
            // if id exists, assign a newPerson with id
            // else assign a newPerson without id
            const newPerson = props.id
                ? {
                    records: [{
                        id: props.id,
                        fields: {
                            Name: name,
                            City: city,
                            Age: parseInt(age)
                        }
                    }]
                }
                : {
                    fields: {
                        Name: name,
                        City: city,
                        Age: parseInt(age)
                    }
                }

            const axios_config = {
                headers: {
                    'Authorization': 'Bearer keys9gKjERVN7YgGk',
                    'Content-Type': 'application/json'
                }
            }
                ;
            try {
                const url = "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Student?maxRecords=3&view=Grid%20view";

                // if id exists, call put
                // else call post
                
                const result = props.id
                    ? await axios.put(url, newPerson, axios_config)
                    : await axios.post(url, newPerson, axios_config);

                    setName("");
                    setCity("");
                    setAge("0");

                props.hide();
            }

            catch (e) {
                console.log("error:" + e);
            }
        }
        sendData();

    }



    return (

        <Modal visible={props.modalVisible}>
            <SafeAreaView>
            <TextInput placeholder="姓名" value={name} onChangeText={text => setName(text)} />
            <TextInput placeholder="城市" value={city} onChangeText={text => setCity(text)} />
            <TextInput placeholder="年齡" value={age} onChangeText={text => setAge(text)} />
            <Button onPress={update} title="確定" />
            <Button onPress={props.hide} title="取消" />
            </SafeAreaView>
        </Modal>
    );

}