//import * as React from 'react';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { StyleSheet, View, ScrollView, Text,TouchableOpacity, Alert,ImageBackground } from 'react-native';
import { Item } from 'native-base';
import React, {useState, useEffect} from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';
//import styles from '../styles';

export default function MyComponent(props) {
  const [acceptances, setAcceptances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [done,setDone] =useState(""); 
  
  //const [Csid,setCsid] =useState(props.Csid);
  //console.log("舉手功能的csid"+Csid)

  console.log("MyComponent");

  // useEffect(() => {
  //   console.log("useEffect in MyComponent");
  //   async function fetchData() {
  //     const axios_config = {
  //       headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
  //     };
  //     const url =
  //     "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Acceptance?maxRecords=50&view=Grid%20view";
  //     const result = await axios.get(url, axios_config);
  //     //console.log(result);
  //     setAcceptances([...result.data.records]);
  //   }

  //   fetchData();
  // }, [acceptances]);

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: {
          "Authorization":
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE2MjgzIiwiZXhwIjoxNjQxOTc4MzU5LCJpc3MiOiJQcm9ncmFtbWluZyBDbGFzc3Jvb20ifQ.zY0_7FPY14jk8ZcOXJIBYAT7jmEN2hmeOv91l3j5yM8",
          },
      };
      const url =
       //"https://api.airtable.com/v0/appCvAxAr9rxmTWh4/WorkList?maxRecords=50&view=Grid%20view";
      "http://140.136.156.12:8080/teacher/acceptance/hw/CSD129/cc";
      const result = await axios.get(url, axios_config);
      //console.log(url);
      setAcceptances(result.data);
      console.log("我接的值"+result.data+"~")
      //console.log(result);
      //setWorks(result.data.records);
    }

    fetchData();
  }, [modalVisible]);


  function handleDelete(){
    async function sendData(){
        const handleDelete={
          records: [{
            id: props.id,
            fields: {
                hw_name:hwname,
                cs_id:Csid,
            }
        }]
        }
        console.log(handleDelete)

        const axios_config = {
            headers: {
                'Authorization': 'Bearer key4eVi7GTb0FVNWK',
                'Content-Type': 'application/json'}
            }
        ;
        try {

            const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Acceptance?maxRecords=50&view=Grid%20view";
            const result = await axios.delete(url, handleDelete, axios_config);
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
    console.log("DoneState"+done);
    return (done);
  }

//  const Item = ({ index, item,onPress}) => (
   
//   <View style={styles.item}>
   
//     <View style={{width:90}}>
//       <DataTable.Cell >{item.fields.Number}</DataTable.Cell>
//     </View>
//     <View style={{width:55,backgroundColor:'#E7E6E1'}}>
//       <DataTable.Cell >{item.fields.Name}</DataTable.Cell>
//     </View>
//     <View style={{width:70}}>
//       <DataTable.Cell >{time(item)}</DataTable.Cell>
//     </View>
//     <View style={{width:40,backgroundColor:'#E7E6E1'}}>
//       <DataTable.Cell >{item.fields.Status}</DataTable.Cell>
//     </View>
//     <View style={{width:40}}>
//       <DataTable.Cell >
//         <TouchableOpacity style={styles.btn} onPress={onPress}>
//           <Text style={styles.btnText}>完成</Text>
//         </TouchableOpacity>
//       </DataTable.Cell>
//     </View>

//   </View>
 
//   );

const Item = ({ index, item,onPress}) => (
   
  <View style={styles.item}>
   
    <View style={{width:90}}>
      <DataTable.Cell >{acceptances[index].}</DataTable.Cell>
    </View>
    <View style={{width:55,backgroundColor:'#E7E6E1'}}>
      <DataTable.Cell >{item.fields.Name}</DataTable.Cell>
    </View>
    <View style={{width:70}}>
      <DataTable.Cell >{time(item)}</DataTable.Cell>
    </View>
    <View style={{width:40,backgroundColor:'#E7E6E1'}}>
      <DataTable.Cell >{item.fields.Status}</DataTable.Cell>
    </View>
    <View style={{width:40}}>
      <DataTable.Cell >
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>完成</Text>
        </TouchableOpacity>
      </DataTable.Cell>
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
      <DataTable.Title numeric>處理</DataTable.Title>
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

    {/* <View style={styles.container2}>
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
   </View> */}
  
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
      btn: { width: 40, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 ,marginLeft:10},
    btnText: { textAlign: 'center', color: '#fff',fontSize: 14,alignItems: "center" },
      button:{ width:100,height:25,backgroundColor: "#f8b62b",borderRadius: 5},
      buttonText: { textAlign: 'center', color: '#fff',fontSize: 20,alignItems: "center" },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });