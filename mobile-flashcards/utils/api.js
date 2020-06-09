import {AsyncStorage} from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'

const DECK_STORAGE_KEY = 'FlashCards:deck'
const NOTIFICATION_KEY = "Flashcards:notification"

//  Return all of the decks along with their titles, questions, and answers.
export function getDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(data => {
            return data !== null ? JSON.parse(data) : null
        }
    );
}

//  Take in a single id argument and return the deck associated with that id.
export function getDeck(id){
    return getDecks()
        .then((decks) => decks[id])
}

// Take in a single title argument and add it to the decks.
export function saveDeckTitle(deckTitle){
    // TODO: Before we add the new deck make sure one doesnt already exist
    const newDeck = {
        title: deckTitle,
        questions: []
    }

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({[deckTitle]: newDeck}))
        .catch((error) => {
            console.log("There was an error saving the deck: ", error)
        })
}


/**
 * Take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
 */
export function addCardToDeck(deckTitle, newCard){
    // Get all of the decks and find the one we are adding the new card for. Merge the card with the found deck
    return getDecks()
        .then((decks) => {
            decks[deckTitle].questions.push(newCard)
            AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks))
                .catch((error) => {
                    console.log("There was an error adding the question to the deck: ", error)
                })
        })
}

// Delete a deck
export function deleteDeck(deckTitle){
    AsyncStorage.removeItem(DECK_STORAGE_KEY, deckTitle)
        .then((data) => {
            return data !== null ? data : null
        })
        .catch((error) => {
            console.log("There was an error deleting the deck: ", error)
        })
}


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
  
function createNotification () {
  return {
    title: `Remeber to keep learning!`,
    body: "👋 Don't forget to quiz yourself for today!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}
  
export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
  }
