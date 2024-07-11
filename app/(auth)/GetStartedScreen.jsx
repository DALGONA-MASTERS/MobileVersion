// GetStartedScreen.jsx

import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'



const GetStartedScreen = ({ navigation }) => {
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

export default GetStartedScreen
