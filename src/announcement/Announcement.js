import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AnnouncementView from './AnnouncementView';
import { FlatList, Alert, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from "react-native";

export default function Announcement() {

    const [announcements, setAnnouncements] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [announcement, setAnnouncement] = useState({
      Title:"",
      Content:""}
    );//temp variable for edit

    useEffect(() => {

      async function fetchData () {
        const axios_config = {
          headers: {'Authorization': 'Bearer key4eVi7GTb0FVNWK'}}
        ;
  
        const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Announcement?maxRecords=30&view=Grid%20view";
        const result = await axios.get(url,axios_config);
        //console.log(result);
        setAnnouncements(result.data.records);
  
      }
  
      fetchData();
  
    },[modalVisible]);


    function hide(){
      setAnnouncement({
        Title:"",
        Content:""
      });
      setSelectedId("");
      setModalVisible(false);
  
    }

    function update(id, index){
      setAnnouncement({
        Title:announcements[index].fields.Title,
        Content:announcements[index].fields.Content
      });
  
      setSelectedId(id);
      setModalVisible(true);
    }
  
  
    const Item = ({ index, item, onPress, style }) => (
      
      <TouchableOpacity onPress={onPress} style={ styles.openButton}>
        <Text style={styles.textStyle}>{item.fields.Title}</Text>
      </TouchableOpacity>
    );

  const renderItem = ({ item, index }) => {

    const backgroundColor = item.id === selectedId ? "#f9c2ff" : "#afdee3";


    return (

      <Item
        index={index}
        item={item}
        onPress={() => update(item.id, index)}
        style={{backgroundColor}}
      />
    );
  };




  return (
    
    <View style={styles.centeredView}>  
    {/* <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>1234444</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>關閉公告</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal> */}
    
      <Text style={styles.textAnnounce}>公佈欄</Text>
        <FlatList 
            data={announcements} 
            renderItem = {renderItem}
            keyExtractor={(item, index) => ""+index}
            >
        </FlatList>
        <AnnouncementView modalVisible = {modalVisible} announcement = {announcement} id={selectedId} hide={hide}/> 
    </View>


  );

}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#ffecd9',
      alignItems: "center",
    },
    centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    modalView: {
      margin: 20,
      width:"90%",
      
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#f8b62b",
      borderRadius: 20,
      padding: 10,
      elevation: 3,
      marginTop:20,
      width:220,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 1,
      textAlign: "center"
    },
    textAnnounce:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:20
    },
  });