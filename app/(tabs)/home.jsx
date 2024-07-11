import { useRouter } from 'expo-router'
import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'
import Header from '../../components/Home/Header'
import TypeEvent from '../../components/Home/TypeEvent'
import TrendingEvent from '../../components/Home/TrendingEvent'
import TrendingLocation from '../../components/Home/TrendingLocation'
import Posts from '../../components/Home/Posts'

const Home = () => {
  const router = useRouter()
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <ScrollView
      style={{}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <TypeEvent />
      <TrendingEvent />
      <TrendingLocation />
      <Posts />
    </ScrollView>
  )
}



export default Home
