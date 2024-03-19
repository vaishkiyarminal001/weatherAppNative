import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar} from 'react-native'
import SearchBar from './SearchBar'
import React, { useEffect, useState } from 'react'
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather( {weatherData} ) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
            name,
            main: { temp, humidity }
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() =>{
        setBackgroundImage(getBackgroundImg(main));

    }, [weatherData])

    function getBackgroundImg(weather){

        if(weather == 'Snow') return snow
        if(weather == 'Clear') return sunny
        if(weather == 'Rain') return rainy
        if(weather == 'Haze') return haze
        return haze;
    }

  return (
    <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMethod='cover'
        >

            <SearchBar/>
            <View style={{alignItems:'center'}}>
                <Text>{name}</Text>
            </View>

        </ImageBackground>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },

    backgroundImage: {
        flex: 1,
        width: Dimensions.get('screen').width
    }
  });
  