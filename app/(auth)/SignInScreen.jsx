// SignInScreen.jsx

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useLoginUserMutation } from '../../features/api/apiSlice'
import { setUser } from '../../features/auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { handleResponse } from '@/utilities/apiUtils'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const SignInScreen = ({ navigation }) => {
  const navig = useNavigation()
  const dispatch = useDispatch()
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const [loginUser, loginUserResult] = useLoginUserMutation()

  const handleSubmit = async () => {
    try {
      await loginUser({ ...formState }).unwrap()
    } catch (error) {
      console.error('Failed to authenticate:', error)
    }
  }
  useEffect(() => {
    handleResponse(loginUserResult, dispatch, navig, 'Tabs')
  }, [loginUserResult])
  const handleChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <View style={{ backgroundColor: '#f1f1f1', height: '100%' }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 22,
            textAlign: 'center',
            marginTop: '35%',
          }}
        >
          Se connecter
        </Text>
      </View>
      <View
        style={{
          marginTop: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <View>
          <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>
            Email ou numéro de téléphone
          </Text>
          <TextInput
            value={formState.email}
            style={styles.login}
            autoCapitalize="none"
            onChangeText={(text) => handleChange('email', text)}
            required
            placeholder="Email"
          />
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>
              Mot de passe
            </Text>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: 'relative',
                top: 43,
                right: 20,
                zIndex: 10,
              }}
            >
              {isPasswordVisible ? (
                <Ionicons name="eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.login}
            placeholder="Password"
            value={formState.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={!isPasswordVisible}
            required
          />
          {loginUserResult.status === 'pending' ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Outfit-Bold',
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                Connexion
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginTop: 10,
        }}
      >
        <Text>Vous n’avez pas de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'Outfit-Bold' }}>
            Inscription
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '45%',
        }}
      >
        <View style={styles.lign}></View>
        <Text style={{ marginHorizontal: 10, fontFamily: 'Outfit' }}>
          Ou continuer avec
        </Text>
        <View style={styles.lign}></View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          marginTop: 20,
        }}
      >
        <View style={styles.social}>
          <FontAwesome5 name="facebook" size={30} color="blue" />
        </View>
        <View style={styles.social}>
          <AntDesign name="google" size={30} color="red" />
        </View>
        <View style={styles.social}>
          <AntDesign name="apple1" size={30} color="black" />
        </View>
      </View>
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
  login: {
    backgroundColor: '#fff',
    width: 350,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c9c9c9',
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 14,
    borderRadius: 99,
    marginTop: 25,
    borderRadius: 5,
  },
  lign: { width: 140, height: 1, borderWidth: 1, borderColor: '#c9c9c9' },
  social: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 99,
    borderColor: '#dadada',
    padding: 16,
  },
})

export default SignInScreen
