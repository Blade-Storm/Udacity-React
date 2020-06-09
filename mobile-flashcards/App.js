import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {createStore} from 'redux'
import {Provider}from 'react-redux'
import Constants from 'expo-constants'
import { createStackNavigator } from '@react-navigation/stack';
import {white, black, lightGrey} from './utils/colors'
import DeckOverview from './components/DeckOverview';
import NewDeck from './components/NewDeck'
import AddCard from  './components/AddCard'
import DeckDetails from './components/DeckDetails'
import Quiz from  './components/Quiz'
import reducer from './reducers'
import middleware from './middleware'
import {setLocalNotification} from './utils/api'

const tabBarOptions = {
  activeTintColor: white,
  style: {
    height: 56,
    backgroundColor: black,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1, 
  },
  indicatorStyle:{
    backgroundColor: white
  }
}

const Tabs = createMaterialTopTabNavigator()

// Component to take into account the phones status bar when rendering the tab navigation
function ScreenStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// Component to render the Tabs
function TabNavigation(){
  return (
    <Tabs.Navigator tabBarOptions={tabBarOptions}>
      <Tabs.Screen name="Decks" component={DeckOverview}/>
      <Tabs.Screen name="New Deck" component={NewDeck}/>
    </Tabs.Navigator>
  )
}


const stackNavigatorOptions = (route) => {
  let title = ""
  if(route !== undefined && route.params !== undefined){
    title = route.params.title
  }
  
  return {
    tabNavigationScreen: {
      headerShown: false
    },
    deckDetails: {
      title: title,
      headerStatusBarHeight: 0,
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      }
    },
    addCard: {
      title: "Add Card",
      headerStatusBarHeight: 0,
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      }
    },
    quiz: {
      title: `Quiz - ${title}`,
      headerStatusBarHeight: 0,
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      }
    }
  }
}

const StackNavigator = createStackNavigator()


export default class App extends Component{
  componentDidMount(){
    setLocalNotification()
  }

  render(){
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{flex: 1}}>
          <ScreenStatusBar backgroundColor={black} barStyle='light-content'></ScreenStatusBar>
            <NavigationContainer>
              <StackNavigator.Navigator>
                  <StackNavigator.Screen name="TabNavigation" options={({route}) => stackNavigatorOptions(route).tabNavigationScreen} component={TabNavigation} />
                  <StackNavigator.Screen name="DeckDetails" options={({ route }) => stackNavigatorOptions(route).deckDetails} component={DeckDetails} />
                  <StackNavigator.Screen name="AddCard" options={({ route }) => stackNavigatorOptions(route).addCard} component={AddCard} />
                  <StackNavigator.Screen name="Quiz" options={({ route }) => stackNavigatorOptions(route).quiz} component={Quiz} />
              </StackNavigator.Navigator>
            </NavigationContainer>
        </View>
      </Provider>
    );
  }
}