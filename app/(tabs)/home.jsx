import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import Header from '../../components/Home/Header'
import TypeEvent from '../../components/Home/TypeEvent'
import TrendingEvent from '../../components/Home/TrendingEvent'
import TrendingLocation from '../../components/Home/TrendingLocation'
import Posts from '../../components/Home/Posts'

const Home = () => {
  const router = useRouter()

  return (
    <ScrollView style={{}}>
      <Header />
      <TypeEvent />
      <TrendingEvent />
      <TrendingLocation />
      <Posts />
    </ScrollView>
  )
}



export default Home
