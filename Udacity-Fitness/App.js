import * as React from 'react'
import { View, Platform, StatusBar, Text, StyleSheet, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import {createStore} from 'redux'
import {Provider}from 'react-redux'
import reducer from './reducers'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {purple, white} from './utils/colors'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import {setLocalNotification} from './utils/helpers'
import * as Permissions from 'expo-permissions'



const tabBarOptions = {
  activeTintColor: Platform.OS === 'ios' ? purple : white,
  style: {
    height: 56,
    backgroundColor: Platform.OS === 'ios' ? white : purple,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
}

const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()


const mainNavigatorOptions = (route) => {
  return {
      tabNavigationScreen: {
      headerShown:false
    },
    entryDetail:{ 
      title: route !== undefined ? route.params.entryId : null,
      headerStatusBarHeight: 0,
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      }
    }
  }
  
}

const MainNavigator = createStackNavigator()


function UdaciStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

function TabNavigation(){
  return (
      <Tabs.Navigator tabBarOptions={tabBarOptions}>
        <Tabs.Screen name="History" component={History} />
        <Tabs.Screen name="AddEntry" component={AddEntry} />
        <Tabs.Screen name="Live" component={Live} />
      </Tabs.Navigator>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render(){
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
            <NavigationContainer>
              <MainNavigator.Navigator>
                <MainNavigator.Screen name="TabNavigation" options={() => mainNavigatorOptions().tabNavigationScreen} component={TabNavigation} />
                <MainNavigator.Screen name="EntryDetail" options={({ route }) => mainNavigatorOptions(route).entryDetail} component={EntryDetail} />
              </MainNavigator.Navigator>
            </NavigationContainer>   
        </View>
      </Provider>
    )
  }
  
}


