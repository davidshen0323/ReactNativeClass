//import * as React from 'react';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { StyleSheet, View, ScrollView, Text,TouchableOpacity, Alert,ImageBackground } from 'react-native';
import { Item } from 'native-base';
import React, {useState, useEffect} from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';
//import styles from '../styles';

export default function MyComponent() {
  const [acceptances, setAcceptances] = useState([]);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [done,setDone] =useState(""); 

  console.log("MyComponent");

  useEffect(() => {
    console.log("useEffect in MyComponent");
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
      "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Acceptance?maxRecords=50&view=Grid%20view";
      const result = await axios.get(url, axios_config);
      console.log(result);
      setAcceptances([...result.data.records]);
    }

    fetchData();
  }, [acceptances]);


  function handleSubmit(){
    async function sendData(){
        const handleSubmit={
          records: [{
            id: props.id,
            fields: {
                Number:number,
                Name:"李佩倫",
                HomeWork:"h1",
                Status: status,
                AcceptDone:"1",
            }
        }]
        }
        console.log(handleSubmit)

        const axios_config = {
            headers: {
                'Authorization': 'Bearer key4eVi7GTb0FVNWK',
                'Content-Type': 'application/json'}
            }
        ;
        try {

            const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Acceptance?maxRecords=50&view=Grid%20view";
            const result = await axios.post(url, handleSubmit, axios_config);
            setNumber("");
            setContent("");
            //props.hide2();
          }

        catch (e){
              console.log("error:"+e);
            }
        }
          sendData();
          
        }





  
 function time (item) {
    var t = item.fields.Time;
    var tt=t.split("T")
    var ttt=tt[1].split(".");
    //alert(tt[0]) 
    return (ttt[0])   
    }

  const AcceptDone =({item}) => item.fields.AcceptDone;

  function Done (item) {
    var done = item.fields.AccepDone;
    console.log(done);
    return (done);
  }

 const Item = ({ index, item}) => (
   
  <View style={styles.item}>
   
    <View style={{width:90}}>
      <DataTable.Cell >{item.fields.Number}</DataTable.Cell>
    </View>
    <View style={{width:50,backgroundColor:'#E7E6E1'}}>
      <DataTable.Cell >{item.fields.Name}</DataTable.Cell>
    </View>
    <View style={{width:130}}>
      <DataTable.Cell >{time(item)}</DataTable.Cell>
    </View>
    <View style={{width:40,backgroundColor:'#E7E6E1'}}>
      <DataTable.Cell >{item.fields.Status}</DataTable.Cell>
    </View>

  </View>
 
  );

const renderItem = ({ item, index }) => {

   return (
//      <DataTable.Row>
//  { Done(item) == "0"?
//       <Item
//         index={index}
//         item={item}
//         style={styles.items}
//       />:
//       <Item
//         index={index}
//         item={item}
//         style={styles.items}
//       />}
//    </DataTable.Row>


<View>
  {acceptances.map((accpetance,index) => Done ==="0")?(
      <DataTable.Row>
          <Item
            index={index}
            item={item}
            style={styles.items}
          />
      </DataTable.Row>)
      :<div></div>
      }
</View>
  );
};



  return (
    <ImageBackground source={require('../img/bg.jpg')} style={styles.backgroundImage} >
    <View style={styles.container}>
    <ScrollView>
  <DataTable style={styles.table}>
    <DataTable.Header style={styles.header}>
      <DataTable.Title>學號</DataTable.Title>
      <DataTable.Title style={{paddingLeft:25}}>姓名</DataTable.Title>
      <DataTable.Title >時間</DataTable.Title>
      <DataTable.Title numeric>狀態</DataTable.Title>
    </DataTable.Header>

    {/* <DataTable.Row>

      {acceptances.map((acceptance,index)
      (
        <DataTable.Row key={index}>
          {acceptanceList.map((list,i)
          (
            <DataTable.Cell key={i} align="center">
              {accpetance[list]}
            </DataTable.Cell>
          )
          )}

        </DataTable.Row>
      )  )}

  
      <DataTable.Cell>jjjjjjj</DataTable.Cell>
      <DataTable.Cell numeric>159</DataTable.Cell>
      <DataTable.Cell numeric>6.0</DataTable.Cell>
      <DataTable.Cell numeric>6.0</DataTable.Cell>
    </DataTable.Row> */}

    <FlatList
      data={acceptances}
      renderItem={renderItem}>
    </FlatList>



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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
      text: { textAlign: 'center', fontWeight: '100',backgroundColor:'pink' },
      dataWrapper: { marginTop: -1 },
      row: { height: 40,flexDirection: 'row', backgroundColor: '#E7E6E1' },
      
      backgroundImage: {
        flex: 1,
      },
      table:{
        backgroundColor:'#ffffff',
      },
      item: { 
        flex: 1,
        flexDirection: "row",
      },
      button:{ width:100,height:25,backgroundColor: "#f8b62b",borderRadius: 5},
      buttonText: { textAlign: 'center', color: '#fff',fontSize: 20,alignItems: "center" },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });