import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Dimensions } from 'react-native';
import Expo, { SQLite } from 'expo';
import { List, FormLabel, FormInput, Button, ListItem, Card } from'react-native-elements';
import { StackNavigator } from 'react-navigation';



const db = SQLite.openDatabase('addressdb.db');
var width = Dimensions.get('window').width;

export default class MyAddressList extends React.Component {
    static navigationOptions = { title: 'Places', };


    constructor(props) {
      super(props);
      this.state = { address: '', addressList: [] };
    }
  

    componentDidMount() {
      db.transaction(tx => {
        tx.executeSql('create table if not exists address (id integer primary key not null, address text);');
      });
      this.updateList();
  
    }
  
    // Save address
    saveItem = () => {
      console.log(this.state)
      db.transaction(tx => {
        tx.executeSql('insert into address (address) values (?)', [this.state.address]);
      }, null, this.updateList)    
    }
  
    // Update addresslist
    updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from address', [], (_, { rows }) => 
          this.setState({ addressList: rows._array })
        );
      });
      console.log('update', this.state.addressList)
    }
  
     // Delete address
     deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql(`delete from address where id = ?;`, [id]);
        }, null, this.updateList
      )
    }

    renderListProducts = () => {
      const { navigate } = this.props.navigation;
      const addressList2 = this.state.addressList.map((value, index) => { 
         return ( 
         <ListItem
           title={value.address}
           key={index}
           rightTitle="show on map" 
           onPressRightIcon={() => navigate('Map', {maps: value.address})}
           onLongPress={() => this.deleteItem(value.id)}
         />
       )
       })
       return addressList2
     }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Placefinder</FormLabel>
        <FormInput style={{width: 90}} placeholder='Enter address'
          onChangeText={(address) => this.setState({ address })}
          value={this.state.address}
        />
        <Button buttonStyle={{paddingLeft: 140, paddingRight: 140}} raised icon={{ name: 'save' }} title="Save" onPress={this.saveItem} />
        <List containerStyle={{ width, marginBottom: 20 }}>
          {
            this.renderListProducts()
          }
        </List>
        </View>
        )
        }
        }

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
        })