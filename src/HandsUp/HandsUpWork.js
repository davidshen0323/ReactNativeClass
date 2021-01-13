import React, {useState, useEffect} from 'react';
import { FlatList, View, Text, TouchableOpacity, StatusBar, StyleSheet,ImageBackground } from 'react-native';
import { Icon, Fab } from "native-base";
import axios from "axios";
//import CommentboxAddEdit from "./CommentboxAddEdit";
// import styles from "../styles";
import { Avatar} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function HandsUpWork({route}) {

   const [works, setWorks] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const [newworks, setNewworks] = useState({
    Title:"",
  });
  const [csid, setCsid] = useState(route.params.Csid);
  console.log(csid);

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

    
  function hide() {
    setNewworks({
        Title:"",
    });
    setSelectedId("");
    setModalVisible(false);
  }

  function close() {
    setNewworks({
        Title:"",
        Content: "",
    });
  }

  function add() {
    setNewworks({
        Title:"",
        Content: "",
    });

    setSelectedId("");
    setModalVisible(true);
  }

  function update(id, index) {
    setNewworks({
      Title: works[index].fields.Title,
    });

    setSelectedId(id);
    setModalVisible(true);
  }

  const Item = ({ index, item, onPress, style }) => (
    <TouchableOpacity onPress={() => navigation.navigate("HandsUpChoose")} style={[styles.item, style]}>
      <Text style={styles.title}>{item.fields.Title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    // const backgroundColor =
    //   item.id === selectedId ? "#fffffff" : styles.item.backgroundColor;

    return (
      <Item
        index={index}
        item={item}
        onPress={() => update(item.id, index)}
        // style={{ backgroundColor }}
        style={styles.item}
      />
    );
  };

  const navigation = useNavigation();

  return (
<ImageBackground source={require('../img/bg.jpg')} style={styles.backgroundImage} >
    <View style={styles.container2}>
      <FlatList
        data={works}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
        // onPress={() => navigation.navigate("HandsUpChoose")}
        />
  
      {/* <Fab onPress={() => add()}>
        <Icon ios="ios-add" android="md-add" />
      </Fab> */}

      {/* <CommentboxAddEdit
        modalVisible={modalVisible}
        commentbox={commentbox}
        id={selectedId}
        hide={hide}
      /> */}
      
    </View>
</ImageBackground>
  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    //backgroundColor: '#ffd1a4',
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",

  },

  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    // backgroundColor: '#ffd1a4',
    marginTop: StatusBar.currentHeight || 0,
    // marginLeft: 5,
    // marginRight:5,
    // marginTop: 10,
    alignItems: "center",

  },


  item: {
    // flex: 5,
    // flexDirection: 'row',
    // backgroundColor: '#f8b62b',
    // padding: 12,
    // marginVertical: 8,
    // // marginHorizontal: 16,
    // borderRadius: 20,
    // width:100,
    flex: 1,
    display:'flex',
    flexDirection: 'column',
    backgroundColor: '#f8b62b',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    width:300,
    
  },

  title: {
    fontSize: 24,
    alignItems: "center",
    textAlign:"center",
  },

  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },


  logo: {

    width: 305,
    height: 159,
    marginBottom: 20,

  },
  backgroundImage: {
    flex: 1,
  },
  

});