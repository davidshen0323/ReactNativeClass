//import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Text,TouchableOpacity, Alert,ImageBackground } from 'react-native';
import { Item } from 'native-base';
import React, {useState, useEffect} from 'react';

export default function MyComponent() {
  const [lists,setLists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
      "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/WorkList?maxRecords=50&view=Grid%20view";
      const result = await axios.get(url, axios_config);
      //console.log(result);
      setWorks(result.data.records);
    }

    fetchData();
  }, [modalVisible]);

  return (
    <ImageBackground source={require('../img/bg.jpg')} style={styles.backgroundImage} >
    <View style={styles.container}>
    <ScrollView>
  <DataTable style={styles.table}>
    <DataTable.Header style={styles.header}>
      <DataTable.Title>學號</DataTable.Title>
      <DataTable.Title numeric>姓名</DataTable.Title>
      <DataTable.Title numeric>時間</DataTable.Title>
      <DataTable.Title numeric>狀態</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>jjjjjjj</DataTable.Cell>
      <DataTable.Cell numeric>159</DataTable.Cell>
      <DataTable.Cell numeric>6.0</DataTable.Cell>
    </DataTable.Row>



    {/* <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={page => {
        console.log(page);
      }}
      label="1-2 of 6"
    /> */}
  </DataTable>
  </ScrollView>

    <View style={styles.container2}>
      <View style={styles.fixToText}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>舉手驗收</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>舉手提問</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>取消舉手</Text>
        </TouchableOpacity>
      </View>
   </View>
  
  </View>
  </ImageBackground>
);
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 25, paddingTop: 30 },
      container2: { flex: 1, paddingTop: 15,paddingBottom:25 },
      header: { backgroundColor: '#f8b62b' },
      text: { textAlign: 'center', fontWeight: '100' },
      dataWrapper: { marginTop: -1 },
      row: { height: 40,flexDirection: 'row', backgroundColor: '#E7E6E1' },
      btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
      btnText: { textAlign: 'center', color: '#fff',fontSize: 16,alignItems: "center" },
      button:{ width:100,height:25,backgroundColor: "#f8b62b",borderRadius: 5},
      buttonText: { textAlign: 'center', color: '#fff',fontSize: 20,alignItems: "center" },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      backgroundImage: {
        flex: 1,
      },
      table:{
        backgroundColor:'#ffffff'
      }
    });