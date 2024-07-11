import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../constants/Colors'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './home'
import ProfileScreen from './profile'
import SearchScreen from './search'

const Tab = createBottomTabNavigator()

const TabLayout = () => {
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

export default TabLayout

const styles = StyleSheet.create({})
