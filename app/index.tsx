// index.jsx or App.jsx

import React from 'react'
import { AppRegistry } from 'react-native'
import Layout from './_layout' // Assuming _layout.jsx is in the same directory

const App = () => {
  return <Layout />
}

AppRegistry.registerComponent('MyApp', () => App)

export default App
