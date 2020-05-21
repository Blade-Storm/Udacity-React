import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

/**
 * SearchContent is responsible for rendering the search page based on the given query
 * and the books that come back from the search.
 */
class SearchContent extends Component{
    state={
        query: "",
    }

    /**
     * @param {*} searchTerm The given search term by the user. 
     * 
     * Update the state with the new term and pass the term to the BooksApp component to 
     * do the search and update the book
     */
    searchBooks(searchTerm){
        this.setState(() => ({
            query: searchTerm
        }))

        this.props.searchBooks(searchTerm)
    }

    /**
     * Updates the shelf a book is on
     */
    shelfChange = (book) => {
        this.props.shelfChange(book)
    }

    /**
     * When the back button is pressed on the search page this will clear the query 
     * so that when the user navigates back to the search page there wont be the previous 
     * search or books list (empty state)
     */
    clearQuery = () =>{
        this.props.searchBooks("")
    }

    render(){
        const {query} = this.state
        const {books} = this.props
       
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" onClick={this.clearQuery}>
                        <button className="close-search">Close</button>
                    </Link>
                    
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}  onChange={(event) => this.searchBooks(event.target.value)} data-name="search-input"/>
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {books !== undefined && books.map(book => (
                            <Book key={book.id} book={book} shelfKey={book.hasOwnProperty('shelf') ? book.shelf : "none"} onShelfChange={this.shelfChange}></Book>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchContent