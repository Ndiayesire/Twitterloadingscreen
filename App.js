import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, MaskedViewIOS,Animated } from 'react-native';
import { render } from 'react-dom';

export default class App extends React.Component {

    state = {
        loadingProgress: new Animated.Value(0),
        animationDone: false 
    };

    componentDidMount() {
      Animated.timing(this.state.loadingProgress, {
        toValue: 100,
        duration : 1000,
        useNativeDriver: true,
        delay: 1450
      }).start(() => {
        this.setState({animationDone: true});
      });

    }

    render(){
  const colorLayer = this.state.animationDone ? null : <View style={[StyleSheet.absoluteFill, {backgroundColor: "#1da1f2"}]} />;

  const whiteLayer=  this.state.animationDone ? null : <View style={[StyleSheet.absoluteFill, {backgroundColor: "#fff"}]} />;

  const imageScale = {

      transform: [
        {
          scale: this.state.loadingProgress.interpolate({

            inputRange: [0, 15, 100],
            outputRange: [0.1, 0.06, 16]
          })
        }
      ]

  };


    const opacity = {
      opacity: this.state.loadingProgress.interpolate({
        
        inputRange: [0, 25, 50],
        outputRange: [0, 0, 1],
        extrapolate: "clamp"
      })
    }
  
  
    return (

    


    <View style={{ flex: 1 }}>
        {colorLayer}
    <MaskedViewIOS style={{flex : 1}} 
    maskElement={
        <View style={styles.centered}>
          <Animated.Image source={require("./assets/logo.png")}
          style={[{width: 1000}, imageScale]}
           resizeMode="contain"/>
        </View>


    }
    >
          {whiteLayer}
      <Animated.View style={[opacity, styles.centered]}>

        <Text>Bienvenue merci de me follow!</Text>
      </Animated.View>
    </MaskedViewIOS>
  
    </View>
  );
}

}



const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
