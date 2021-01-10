import React, {useState, useEffect} from 'react';
import { FlatList, View, Text, TouchableOpacity, StatusBar, StyleSheet, Image} from 'react-native';
import { Icon, Fab } from "native-base";
import axios from "axios";
import CommentboxAddEdit from "./CommentboxAddEdit";
// import styles from "../styles";
import { Avatar} from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function CommentboxList() {

   const[commentboxs, setCommentboxs] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const [commentbox, setCommentbox] = useState({
    Title:"",
    Content: "",
  });
   

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
        "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/CommentboxList?maxRecords=100&view=Grid%20view";
      const result = await axios.get(url, axios_config);
      //console.log(result);
      setCommentboxs(result.data.records);
    }

    fetchData();
  }, [modalVisible]);

    

  


  const ImagesExample = () => (
    <Image source = {{uri:'https://image.flaticon.com/icons/svg/1915/1915932.svg'}}
    style = {{ width: 400, height: 400 }}
    />
 )


  return (
    
    <View style={styles.container2}>

      <ImagesExample />
      <Text style={styles.textCommentbox}>討論區22222</Text>
      
      
     

    
      
    </View>

  );

}





const styles = StyleSheet.create({

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#ffd1a4',
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",

  },

  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    backgroundColor: '#ffecd9',
    marginTop: StatusBar.currentHeight || 0,
    // marginLeft: 5,
    // marginRight:5,
    // marginTop: 10,
    alignItems: "center",

  },


  item: {
    flex: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    backgroundColor: '#f8b62b',
    padding: 15,
    marginVertical: 8,
    // marginHorizontal: 16,
    alignContent: 'space-around',
    borderRadius: 20,

    height:100,
    width:300
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemtext:{
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },


  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },

  logo: {

    width: 305,
    height: 159,
    marginBottom: 20,

  },

  textCommentbox:{
    fontSize:30,
    fontWeight:'bold',
    marginBottom:20
},

frame:{
  justifyContent: 'center',
  alignItems: 'center',
  flex:5,
  alignContent: 'space-around',
},

frame2:{
  justifyContent: 'center',
  alignItems: 'center',
  flex:5,
  alignContent: 'space-around',
},


  
  

});

export default CommentboxList;