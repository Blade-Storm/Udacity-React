import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import MetricCard from './MetricCard'
import {addEntry} from '../actions'
import {removeEntry} from '../utils/api'
import {timeToString, getDailyReminderValue} from '../utils/helpers'
import TextButton from '../components/TextButton'


class EntryDetail extends Component{

    remove = (entryId) => {
        const {dispatch} = this.props

        dispatch(addEntry({
            [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        }))
    }

    reset = () => {
        const {remove, navigation, entryId} = this.props

        // remove()
        // goBack()
        this.remove(entryId)
        navigation.goBack()
        removeEntry(entryId)
    }

    shouldComponentUpdate(nextProps){
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    render(){
        const {metrics} = this.props
        return(
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    RESET
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

function mapStateToProps(state, {route, navigation}){
    const {entryId} = route.params

    return{
        entryId,
        metrics: state[entryId],
        navigation
    }
}

// TODO: Figure out why adding mapDispatchToProps to the connect function wasnt rendering the component
function mapDispatchToProps (dispatch, {route, navigation}){
    const {entryId} = route.params

    return{
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })),
        goBack: navigation.goBack()
    }
}

export default connect(mapStateToProps)(EntryDetail)