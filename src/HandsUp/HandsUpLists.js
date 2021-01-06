import { Button } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text,TouchableOpacity, Alert,ImageBackground } from 'react-native';
import { Table, TableWrapper, Row,Cell } from 'react-native-table-component';
 
export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['學號', '姓名', '時間', '狀態', '處理'],
      widthArr:[ 100, 80, 80, 60, 100],
      tableData: [
        ['406401111', '沈大為', '11:01', '驗收','5'],
        ['406401202', '李佩倫', '11:02', '提問','e'],
        ['406401599', '楊家誠', '11:03', '驗收','5'],
        ['406401616', '黃瀚頡', '11:03', '驗收','5'],
        ['406401628', '程榆晴', '11:05', '提問','5'],
        ['406401111', '沈大為', '11:01', '驗收','5'],
        ['406401202', '李佩倫', '11:02', '提問','e'],
        ['406401599', '楊家誠', '11:03', '驗收','5'],
        ['406401616', '黃瀚頡', '11:03', '驗收','5'],
        ['406401628', '程榆晴', '11:05', '提問','5'],
        ['406401111', '沈大為', '11:01', '驗收','5'],
        ['406401202', '李佩倫', '11:02', '提問','e'],
        ['406401599', '楊家誠', '11:03', '驗收','5'],
        ['406401616', '黃瀚頡', '11:03', '驗收','5'],
        ['406401628', '程榆晴', '11:05', '提問','5'],
      ]
    }
  }
 
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    // const tableData = [];
    // for (let i = 0; i < 10; i += 1) {
    //   const rowData = [];
    //   for (let j = 0; j < 9; j += 1) {
    //     rowData.push(`${i}${j}`);
    //   }
    //   tableData.push(rowData);
    // }
    const element = (data, index) => (
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>button</Text>
          </View>
        </TouchableOpacity>
      );
 
    return (
      <ImageBackground source={require('../img/bg.jpg')} style={styles.backgroundImage} >
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text} widthArr={state.widthArr}/>
                      ))
                    }
                  </TableWrapper>

                    // <Row
                    //   key={index}
                    //   data={rowData}
                    //   widthArr={state.widthArr}
                    //   style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                    //   textStyle={styles.text}
                    // />
                  ))
                }
              </Table>
          
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
        </ScrollView>
        
        
      </View>
      </ImageBackground>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  container2: { flex: 1, paddingTop: 15,paddingBottom:25 },
  header: { height: 40, backgroundColor: '#f8b62b' },
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
});

