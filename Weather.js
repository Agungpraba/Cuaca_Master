import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

const windIcon = require('./img/wind.png');
const tempIcon = require('./img/temp.png');
const mainIcon = require('./img/main.png');
const levelIcon = require('./img/sea.png');

export default class Weather extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      city: '',
      forecast: {
        main: '-',
        description: '-',
        temp: 0,
        sunrise: 0,
        sunset: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
        speed: 0,
      }
    };
  }
getWeather= () => {
  let url = 'http://api.openweathermap.org/data/2.5/weather?q='+ this.state.city + '&appid=943c0b7f1e2fac29d8f80a7169c4283b&units=metric';
  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    this.setState({
      forecast : {
        main: responseJson.weather[0].main,
        description: responseJson.weather[0].description,
        temp: responseJson.main.temp,
        sunrise: responseJson.sys.sunrise,
        sunset: responseJson.sys.sunset,
        pressure: responseJson.main.pressure,
        humidity: responseJson.main.humidity,
        sea_level: responseJson.main.sea_level,
        grnd_level: responseJson.main.grnd_level,
        speed: responseJson.wind.speed
      }
    });
  }
  );

}
  render() {
    return (
    <View style={styles.containerMain}>
      <View style={styles.box2}>
      <Text style={{ textAlign: 'center', paddingTop: 15,fontSize: 20 }}> Enter The City Name </Text>
          <TextInput
              style={{ textAlign: 'center',height: 40, width: 150, fontSize: 20, backgroundColor: '#FFFFE0'}}
              placeholder= " Enter the City "
              onChangeText={(city) => this.setState({ city })}
            />
            <Button
              onPress={() => this.getWeather()}
              title="Search"
              color="black"
              accessibilityLabel="See Weather"
            />
      </View>

        <View style={styles.box4}>
        <View style={styles.button}>
        <View style={styles.iconContainer}>

       </View>
          <Text> Temp : { this.state.forecast.temp} </Text>
          <Text> Weather : { this.state.forecast.main} </Text>
            <Text> Description : { this.state.forecast.description} </Text>
        </View>
      </View>


</View>
    );
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#32CD32',
    flex: 1,
    flexDirection: 'column'
  },
  box1: {
    flex: 0.7,
    backgroundColor: 'blue',
  },
  box2: {
    flex: 0.4,
    backgroundColor: '#008000',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  box3: {
    flex: 0.5,
    backgroundColor: '#ADFF2F',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box4: {
    flex: 0.3,
    backgroundColor: '#008000',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    
    flexDirection: 'column'
  }


});
