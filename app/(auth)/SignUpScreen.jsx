// SignUpScreen.jsx

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useRegisterUserMutation } from '../../features/api/apiSlice'
import { setUser } from '../../features/auth/authSlice'
const SignUpScreen = ({ navigation }) => {
  const navig = useNavigation()
  const dispatch = useDispatch()

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  })

  const [
    registerUser,
    {
      isLoading: isRegistering,
      isSuccess: registerSuccess,
      isError: registerError,
      error: registerErrorMsg,
    },
  ] = useRegisterUserMutation()

  useEffect(() => {
    if (registerSuccess) {
      dispatch(setUser(formState))
      navigation.navigate('Home')
    }
    if (registerError) {
      Alert.alert(
        'Error',
        registerErrorMsg?.data?.message || 'Registration failed'
      )
    }
  }, [registerSuccess, registerError])

  const handleSubmit = async () => {
    try {
      await registerUser({ ...formState }).unwrap()
    } catch (error) {
      console.error('Failed to register:', error)
    }
  }

  const handleChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        value={formState.name}
        onChangeText={(text) => handleChange('name', text)}
        required
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={formState.email}
        onChangeText={(text) => handleChange('email', text)}
        required
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formState.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        required
      />
      {isRegistering ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      )}
      <Button
        title="Back to Get Started"
        onPress={() => navigation.navigate('GetStarted')}
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
})

export default SignUpScreen
