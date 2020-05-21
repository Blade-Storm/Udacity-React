import React from 'react'
import {Route} from 'react-router-dom'
import { debounce } from 'throttle-debounce';
import BookContent from './BookContent'
import SearchContent from './SearchContent'
import * as BooksAPI from './BooksAPI'
import './App.css'



/**
 * BooksApp is the highest level component. It maintains the books state for both the book shelf and search page
 */
class BooksApp extends React.Component {
  state={
      shelfBooks: [],
      searchBooks: []
  }

  /**
   * When the app loads get all of the book data
   */
  componentDidMount() {
    BooksAPI.getAll()
    .then((shelfBooks) => {
        this.setState(() => ({
          shelfBooks
        }))
    })   
  }

  /**
   * Updates the shelf a book is on
   */
  updateBookShelf = (book) => {
    BooksAPI.update(book, book.shelf)
      .then(() => {
         // If the book is not already in the shelfBooks then append the list
        if(!(this.state.shelfBooks.filter(shelfBook => shelfBook.id === book.id).length > 0)){
          this.state.shelfBooks.push(book)
        }

        this.setState((prevState) => ({
           prevState
        }))
    })
  }

  /**
   * If the search doesnt come back as:
   * 1. undefined
   * 2. {error: ...}
   * 
   * then update the searchBooks with the result, 
   * otherwise set to empty list so the search results are empty
   */ 
  onSearchBooks = debounce(100, searchTerm => {
    if(searchTerm.length > 0){
      // Search for the books
      BooksAPI.search(searchTerm)
      .then((searchBooks) => {
          if(searchBooks !== undefined && !searchBooks.hasOwnProperty('error')){
            // Loop through each shelfBook and if that book exists in the searchBooks
            // Update the searchBook with the shelfBook. This will allow us to 'maintain'
            // Which shelf the book is on when it comes back from the search
            this.state.shelfBooks.forEach(shelfBook => {
              searchBooks.forEach((searchBook, index) => { 
                if(searchBook.id === shelfBook.id){
                  searchBooks[index] = shelfBook
                }
              });
            });

            this.setState(() => ({
              searchBooks
            }))
          }
      })
    }

    // Prevent the last list of searched books from showing if the search term is invalid or ""
    this.setState(() => ({
      searchBooks: []
    }))
  });

  render() {
    const {shelfBooks, searchBooks} = this.state

    return (
      <div className="app">
          <Route path="/search" render={() => (
            <SearchContent books={searchBooks} shelfChange={this.updateBookShelf} searchBooks={this.onSearchBooks}></SearchContent>
          )} />
         
          <Route exact path="/" render={() => (
            <BookContent books={shelfBooks} shelfChange={this.updateBookShelf} ></BookContent>
          )} />
      </div>
    )
  }
}

export default BooksApp
