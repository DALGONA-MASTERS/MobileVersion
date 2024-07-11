// SignInScreen.jsx

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../../features/api/apiSlice'
import { setUser } from '../../features/auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignInScreen = ({ navigation }) => {
    const navig = useNavigation()
    const dispatch = useDispatch()

    const [formState, setFormState] = useState({
      email: '',
      password: '',
    })

    const [
      loginUser,
      {
        isLoading: isLoggingIn,
        isSuccess: loginSuccess,
        isError: loginError,
        error: loginErrorMsg,
        data: loginData,
      },
    ] = useLoginUserMutation()

    useEffect(() => {
      if (loginSuccess) {
        const { token, user } = loginData // Adjust based on your API response
        AsyncStorage.setItem('userToken', token)
        dispatch(setUser(user))
        navigation.navigate('Home')
      }
      if (loginError) {
        Alert.alert(
          'Error',
          loginErrorMsg?.data?.message || 'Authentication failed'
        )
      }
    }, [
      loginSuccess,
      loginError,
      loginData,
      dispatch,
      navigation,
      loginErrorMsg,
    ])

    const handleSubmit = async () => {
      try {
        await loginUser({ ...formState }).unwrap()
      } catch (error) {
        console.error('Failed to authenticate:', error)
      }
    }

    const handleChange = (name, value) => {
      setFormState((prevState) => ({ ...prevState, [name]: value }))
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
      {isLoggingIn ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
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

export default SignInScreen
