import React from 'react';
import { Text, StyleSheet, View, Dimensions, TextInput, Alert, FlatList } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { MapView }  from 'expo';
import { SQLite } from 'expo';
import MapPage from './MapPage';
import MyAddressList from './MyAddressList';

export default class App extends React.Component { 
  
  render() {
    return <MyApp/>;
  }
}

const MyApp = StackNavigator({
  Places: {screen: MyAddressList},
  Map: {screen: MapPage},
  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});