import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

// Stores all of the book shelves we have and their key. Used to iterate over to create the BookShelf(s)
export const shelves = [{title: "Currently Reading", key: 'currentlyReading'}, {title: "Want to Read", key:'wantToRead'}, {title:"Read", key:'read'}]
/**
 * Renders all of the book shelves for the main '/' page
 */
function BookContent(props){
    
    // const shelves = [{title: "Currently Reading", key: 'currentlyReading'}, {title: "Want to Read", key:'wantToRead'},{title:"Read", key:'read'}]

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
                <div>
                    {/*For each of the shelves create a BookShelf and pass the books and the shelf */}
                    {shelves.map(shelf => (
                        <div className="bookshelf" key={shelf.title} data-name="book-shelf">
                            <h2 className="bookshelf-title">{shelf.title}</h2>

                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {/*Filter all of the books by their shelf.key. This is the identifier to what shelf they belong to */}
                                    {props.books !== undefined && props.books.filter(book => book.shelf === shelf.key).map(book => (
                                        <Book key={book.id} book={book} shelfKey={shelf.key} onShelfChange={props.shelfChange}></Book>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="open-search">
                <Link 
                    to='/search'
                >
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    )
    
}

export default BookContent