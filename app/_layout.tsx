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
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import profile from './(tabs)/profile'
import TabLayout from './(tabs)/_layout'
import Evenement from './evenement/events'

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
        <Stack.Navigator
          initialRouteName="GetStarted"
        >
          <Stack.Screen
            name="GetStarted"
            component={GetStartedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: 'Sign In', headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Sign Up', headerShown: false }}
          />
          <Stack.Screen
            name="Evenements"
            component={Evenement}
            
          />
          <Stack.Screen name="Tabs" component={TabLayout} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
        tabBarStyle: {
          padding: 15,
          height: 80,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Recherche',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-sharp" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const RootLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true))
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }
  const isSignedIn = user !== null

  return (
    <NavigationContainer independent={true}>
      {isSignedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default RootLayout
