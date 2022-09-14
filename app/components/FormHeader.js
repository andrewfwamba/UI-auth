import { View, Text, StyleSheet, Animated } from 'react-native'
import React from 'react'

const formHeader = ({
  leftHeading, 
  rightHeading,
   subHeading, 
   leftHeaderTranslateX = 40, 
   rightHeaderTranslateY = -20, 
   rightHeaderOpacity = 0}) => {
  return <>
  <View style={styles.container}>
        <Animated.Text style={[styles.heading, {transform: [{translateX: leftHeaderTranslateX}]}]}>{leftHeading}</Animated.Text>
        <Animated.Text style={[styles.heading, {opacity: rightHeaderOpacity, transform: [{translateY: rightHeaderTranslateY}]}]}>{rightHeading}</Animated.Text>
      </View>
      <Text style={styles.subheading}>{subHeading}</Text>
  </>
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    heading: {fontSize: 30, fontWeight: 'bold', color: '#1b1b33'},
    subheading: {fontSize: 18, fontWeight: '600', color: '#1b1b33', textAlign: 'center'}

})

export default formHeader