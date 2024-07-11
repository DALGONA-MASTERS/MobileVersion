import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect } from 'react'
import ProfileCard from './ProfileCard'
import PostCard from './PostCard'
import { useGetPostsMutation } from './../../features/api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchedData } from '../../utilities/apiUtils'
import { selectPosts, setPosts } from '../../features/posts/postsSlice'

const Posts = () => {
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()
  const [getPosts, getPostsResult] = useGetPostsMutation()
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [page, setPage] = React.useState(1) 

  React.useEffect(() => {
    getPosts()
  }, [getPosts])

  useEffect(() => {
    if (getPostsResult.isSuccess) {
      handleFetchedData(getPostsResult, dispatch, setPosts)
      setIsLoadingMore(false)
    }
    if (getPostsResult.isError) {
      console.error('Error fetching posts:', getPostsResult.error)
      setIsLoadingMore(false) 
    }
  }, [getPostsResult, dispatch])

  useEffect(() => {
    console.log('Posts',posts)
    console.log('getPostsResult:', getPostsResult)
  }, [getPostsResult])

  

  const user = [
    {
      id: 1,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 2,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 3,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 4,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 5,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 6,
      name: 'Jamel',
      imageUrl: '',
    },
  ]

  

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <FlatList
        data={user}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProfileCard detail={item} key={index} />
        )}
      />
      <FlatList
        data={getPostsResult.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => <PostCard post={item} key={index} />}
        
      />

      {/* <PostCard post={getPostsResult} />
      <PostCard /> */}
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({})
