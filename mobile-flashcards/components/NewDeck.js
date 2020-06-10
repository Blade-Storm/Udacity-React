import React, {Component} from 'react'
import {View, Text, TextInput, Button} from 'react-native'
import {connect} from 'react-redux'
import {black} from '../utils/colors'
import {saveDeckTitle, getDeck} from '../utils/api'
import {addDeckTitle} from '../actions'
import {BasicButton} from './Buttons'


class NewDeck extends Component{
    state={
        value: '',
        error: false
    }

    // Submit the new deck to the data store
    submit = () => {
        const value = this.state.value
        // If the new title value is empty dont save it
        if(value.trim() === ''){
            this.setState(() => ({
                error: true
            }))
            return
        }


        // Add the new deck to the data store and redux
        this.props.dispatch(addDeckTitle(value))
        saveDeckTitle(value)

        // Navigate to the individual deck view and clear the form
        this.setState(() => ({
            value: '',
            error: false
        }))

        this.props.navigation.navigate('DeckDetails', {title: value})
    }

    // Change the value of the input
    onChangeText = (text) =>{
        this.setState(() => ({
            value: text
        }))
    }

    render(){
        const {value} = this.state

        return(
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>

                <TextInput 
                    onChangeText={text => this.onChangeText(text)}
                    value={value}
                    placeholder='Deck Title'
                    style={styles.input}
                />
                {this.state.error && <Text style={{color: 'red'}}>The title cannot be empty</Text>}

                <BasicButton 
                        title="Submit" 
                        onPress={this.submit}
                        accessibilityLabel="Submit the title of the new deck"
                > Submit</BasicButton>
               
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginBottom: 15,
        fontSize: 30,
        textAlign: "center"
    },
    input: {
        width: "90%",
        padding: 15,
        alignSelf: "center",
        marginBottom: 15,
        fontSize: 20,
        borderRadius: 5,
        borderWidth: 2
    }
}

function mapStateToProps(state, {navigation}){

    return {
        state,
        navigation
    }
}

function mapDispatchToProps({dispatch}){
    return{
        dispatch
    }
}

export default connect(mapStateToProps)(NewDeck)