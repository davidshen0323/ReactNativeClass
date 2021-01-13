import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AnnouncementView from './AnnouncementView';
import { FlatList, Alert, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity, RefreshControl } from "react-native";
import { Icon, Fab } from "native-base";
import AnnouncementAdd from './AnnouncementAdd';
import AnnouncementDelete from './AnnouncementDelete';


export default function Announcement({route}) {


    const [announcements, setAnnouncements] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [announcement, setAnnouncement] = useState({
      Title:"",

      Content:"",
      at_id: ""}
    );
 
    const [Csid, setCsid] = useState(route.params.Csid);
    console.log("公告的id "+Csid);
    

    useEffect(() => {

      async function fetchData () {
        const axios_config = {
          headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE2MjgzIiwiZXhwIjoxNjQxOTc4MzU5LCJpc3MiOiJQcm9ncmFtbWluZyBDbGFzc3Jvb20ifQ.zY0_7FPY14jk8ZcOXJIBYAT7jmEN2hmeOv91l3j5yM8'}}
        ;
  
        const url=`http://140.136.156.12:8080/teacher/announcement/CSD125/get/`;
        const result = await axios.get(url, axios_config);
        console.log(result.data);
        setAnnouncements(result.data);
        console.log("我接的值"+announcements+"~");
      }
  
      fetchData();
  
    },[announcement]);

    function add() {
      setAnnouncement({
        Title: "",
        Content: "",
      });
  
      // setSelectedId("");
      setModalVisible2(true);
    }


    function hide(){
      setAnnouncement({
        Title:"",
        Content:""
      });
      setSelectedId("");
      setModalVisible(false);
  
    }
    function hide2() {
      setAnnouncement({
        Title: "",
        Content: "",
      });
      setSelectedId("");
      setModalVisible2(false);
      
    }
    function hide3() {
      setAnnouncement({
        Title: "",
        Content: "",
      });
      setSelectedId("");
      setModalVisible3(false);
      
    }
    function update(at_id, index){
      setAnnouncement({
        Title:announcements[index].at_title,
        Content:announcements[index].at_content
      });
  
      // setSelectedId(announcements[index].at_id);
      console.log("我選的公告id "+selectedId+"~");
      setModalVisible(true);
    }
  
    function Delete(index){
      setAnnouncement({
        Title:announcements[index].at_title,
        Content:announcements[index].at_content,
        at_id: announcements[index].at_id,
      });
      console.log("announcements = "+announcements)
      console.log("ATID~~"+announcements[index].at_id)
      setSelectedId(announcements[index].at_id);
      setModalVisible3(true);
    }
  
    
    const Item = ({ index, item, onPress, onLongPress, style }) => (
      
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={ styles.openButton}>
        <Text style={styles.textStyle}>{announcements[index].at_title}</Text>
      </TouchableOpacity>
    );

  const renderItem = ({ item, index }) => {

    const backgroundColor = item.id === selectedId ? "#f9c2ff" : "#afdee3";


    return (
      <Item
        index={index}
        item={item}
        onPress={() => update(item.selectedId, index)}
        onLongPress={() => Delete(index)}
        style={{backgroundColor}}
      />
    );
  };




  return (
    
    <View style={styles.centeredView}>   
      <Text style={styles.textAnnounce}>公佈欄</Text>
        <FlatList 
            data={announcements} 
            renderItem = {renderItem}
            keyExtractor={(item, index) => ""+index}>
        </FlatList>
        <AnnouncementView modalVisible = {modalVisible} announcement = {announcement} id={selectedId} hide={hide}/> 
        <AnnouncementDelete modalVisible3 = {modalVisible3} Delete = {Delete} announcement = {announcement} id={selectedId} hide3={hide3}/> 
        <Fab style={styles.fab} onPress={() => add()}>
          <Icon ios="ios-add" android="md-add" />
        </Fab>
      <AnnouncementAdd modalVisible2 = {modalVisible2} Csid={Csid} add={add} hide2={hide2}/>
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
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:"#f8b62b"
    },
  });