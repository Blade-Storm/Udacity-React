import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {black, white} from '../utils/colors'


export function TextButton ({children, onPress, style = {}}){
  return(
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.textBtn, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

export function BasicButton ({children, onPress, style = {}}){
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.basicBtn, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textBtn: {
    textAlign: "center",
    color: black,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
  basicBtn: {
    backgroundColor: black,
    color: white,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
})