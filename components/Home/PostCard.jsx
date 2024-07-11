import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { useGetUserQuery } from '../../features/api/apiSlice'
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUpdateCommentMutation,
  useUpdatePostMutation,
} from '../../features/api/apiSlice'
import {
  handleEditData,
  handleAddData,
  handleDeleteData,
} from '../../utilities/apiUtils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../features/store'
import { deletePostData, editPostData } from '../../features/posts/postsSlice'
import { selectUser, setUser } from '../../features/auth/authSlice'


const PostCard = ({ post }) => {


  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://192.168.182.212:8042/api/users`,
        {
          withCredentials: true,
        }
      )
      getUsers(response.data)
      console.log('Users:', response.data)
    } catch (error) {
      console.error('Error fetching users:', error.message)
    }
  }
  useEffect(() => getUsers(), [])

  const handleLike = async () => {
    try {
      await likePost(post._id).unwrap()
      console.log('Post liked successfully!')
    } catch (error) {
      console.error('Failed to like post:', error)
    }
  }
  // useEffect(() => getUsers(),[])
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 500,
          backgroundColor: '#b6d4b6',
          padding: 15,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          gap: 10,
          marginTop: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Image
              source={require('./../../assets/images/profile.jpg')}
              style={{ width: 60, height: 60, borderRadius: 1000 }}
            />
            <View>
              <Text style={{ textAlign: 'center', fontFamily: 'Outfit-Bold' }}>
                {post.author}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Outfit-Med',
                  fontSize: 10,
                }}
              >
                @Jamel
              </Text>
            </View>
          </View>
          <SimpleLineIcons
            style={{ marginRight: 10 }}
            name="options-vertical"
            size={24}
            color="#1a5319"
          />
        </View>
        <View>
          <Image
            source={require('./../../assets/images/benovloat.jpg')}
            style={{ width: '100%', height: 180, borderRadius: 15 }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              right: 10,
              top: 5,
              gap: 15,
              zIndex: 10,
              position: 'relative',
            }}
          >
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleLike}>
                <Ionicons name="heart" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 12 }}>{post.likesCount}</Text>
            </View>

            <Ionicons name="chatbubble-ellipses" size={24} color="white" />
            <Ionicons name="arrow-redo-sharp" size={24} color="white" />
            <Ionicons name="bookmark" size={24} color="white" />
          </View>
        </View>

        <Text style={{ fontFamily: 'Outfit' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum
          quas adipisci atque tempora obcaecati est. Repellat aliquam ratione,
          eligendi suscipit iste quas! Repellat aliquam rerum corrupti quasi
          doloribus culpa.
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
        </View>
      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({})
