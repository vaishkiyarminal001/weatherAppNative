import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';


const apikey = "f3ec760f890de6d7966c728c8a3b019b";

export default function App() {
  
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  
  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`;

    try {
      const response = await fetch(apiurl);
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);      
    }
  }

  useEffect(() => {
    fetchWeatherData("Mumbai");
  }, []);

  if(!loaded){
    return(
      <View style={styles.container}>
        <ActivityIndicator color='gray' size ={36}/>
      </View>
    )
  }

  else if(weatherData === null){
    return(
    <View>
      <SearchBar fetchWeatherData={fetchWeatherData}/>
      <Text style={styles.primeryData}>Oops!!!! City Not Found! Try Some Different City</Text>
    </View>
);
  }

  console.log(weatherData);

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primeryData:{
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 28,
  }

});
