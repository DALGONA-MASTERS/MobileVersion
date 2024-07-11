// Layout.jsx

import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GetStartedScreen from './(auth)/GetStartedScreen'
import SignInScreen from './(auth)/SignInScreen'
import SignUpScreen from './(auth)/SignUpScreen'
import HomeScreen from './(tabs)/home'
import SearchScreen from './(tabs)/search'
import ProfileScreen from './(tabs)/profile'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Provider } from 'react-redux'
import { persistor, store } from './../features/store'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const loadFonts = async () => {
  await Font.loadAsync({
    Outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-Med': require('../assets/fonts/Outfit-Medium.ttf'),
  })
}


const AuthStack = () => {

  return (
    <NavigationContainer independent={true}>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="GetStarted">
          <Stack.Screen
            name="GetStarted"
            component={GetStartedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: 'Sign In' }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Sign Up' }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Search"
        options={{ headerShown: false }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}

const Layout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true))
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }
  const [user, setUser] = useState(null) 
  return (
    <NavigationContainer independent={true}>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Layout
