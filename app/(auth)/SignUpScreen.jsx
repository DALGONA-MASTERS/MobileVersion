import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useRegisterUserMutation } from '../../features/api/apiSlice'
import { setUser } from '../../features/auth/authSlice'
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const SignUpScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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
  }, [registerSuccess, registerError, dispatch, navigation, registerErrorMsg])

  const handleChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      await registerUser({ ...formState }).unwrap()
    } catch (error) {
      console.error('Failed to register:', error)
    }
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
          Inscription
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <View>
          <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>Email</Text>
          <TextInput
            style={styles.login}
            autoCapitalize="none"
            value={formState.email}
            placeholder="Email..."
            onChangeText={(text) => handleChange('email', text)}
          />
        </View>
        <View>
          <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>
            Mot de passe
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.login}
              value={formState.password}
              placeholder="Password..."
              secureTextEntry={!isPasswordVisible}
              onChangeText={(text) => handleChange('password', text)}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: 'absolute',
                right: 15,
                top: 15,
              }}
            >
              {isPasswordVisible ? (
                <Ionicons name="eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Outfit-Bold',
              fontSize: 15,
              textAlign: 'center',
            }}
          >
            S’inscrire
          </Text>
        </TouchableOpacity>
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
        <Text>Vous possédez déjà un compte?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'Outfit-Bold' }}>
            Connexion
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '55%',
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
    width: '84%',
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

export default SignUpScreen
