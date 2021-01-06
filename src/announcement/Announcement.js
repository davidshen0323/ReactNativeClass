import React, {useState} from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
  } from "react-native";

export default function Announcement() {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    
  return (
    
    <View style={styles.centeredView}>
        
        <Text style={styles.textAnnounce}>公佈欄</Text>
                
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>今天要上課唷! 12/23</Text>

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
    </Modal>

    <TouchableHighlight
      style={styles.openButton}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Text style={styles.textStyle}>今天要上課唷</Text>
    </TouchableHighlight>


    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible2}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>今天不用上課唷! 12/25</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible2(!modalVisible2);
            }}
          >
            <Text style={styles.textStyle}>關閉公告</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    <TouchableHighlight
      style={styles.openButton}
      onPress={() => {
        setModalVisible2(true);
      }}
    >
      <Text style={styles.textStyle}>今天不用上課唷</Text>
    </TouchableHighlight>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible3}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>記得做作業! 01/05</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible3(!modalVisible3);
            }}
          >
            <Text style={styles.textStyle}>關閉公告</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    <TouchableHighlight
      style={styles.openButton}
      onPress={() => {
        setModalVisible3(true);
      }}
    >
      <Text style={styles.textStyle}>記得做作業</Text>
    </TouchableHighlight>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible4}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>這禮拜不用來!這禮拜不用來!這禮拜不用來!這禮拜不用來!這禮拜不用來!</Text>
          <Text style={styles.modalText}>01/13</Text>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible4(!modalVisible4);
            }}
          >
            <Text style={styles.textStyle}>關閉公告</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    <TouchableHighlight
      style={styles.openButton}
      onPress={() => {
        setModalVisible4(true);
      }}
    >
      <Text style={styles.textStyle}>最後一週不用來</Text>
    </TouchableHighlight>
  </View>


  );

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom:"95%"
    },
    centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
      elevation: 2,
      marginTop:10,
      width:"80%",
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