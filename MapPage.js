import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Dimensions } from 'react-native';
import Expo, { SQLite } from 'expo';
import { MapView } from 'expo';
import { List, FormLabel, FormInput, Button, ListItem, Card } from'react-native-elements';
import { StackNavigator } from 'react-navigation';


var width = Dimensions.get('window').width;

export default class MapPage extends React.Component {
    static navigationOptions = { title: 'Map', };


  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = { 
      address: props.navigation.state.params.maps, 
      region: {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      } };
  }

  componentDidMount = () => {

    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyBxKK48nvrjoyS08u8HnGAiRZxHIy1yb0c'
    fetch(url)
      .then((respon) => respon.json())
      .then((responseData) => {
        const lat = responseData.results[0].geometry.location.lat;
        const lng = responseData.results[0].geometry.location.lng;
        //console.log('lat:' + lat)
        this.setState({
          region: {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }
        })
      });
  }
  onChangeRegion(region) {
    this.setState({ region })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1, height: 300, width: 300 }}
          onRegionChange={this.state.onRegionChange}
          region={this.state.region}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
          />
        </MapView>
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