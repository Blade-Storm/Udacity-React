import React, {Component} from 'react'

/**
 * Renders all of the information for a Book
 */
class Book extends Component{
    /**
     * Sends the book to the parent component to get re-shelved
     */
    onShelfChange = (event) =>{
        this.props.book.shelf = event.target.value
        this.props.onShelfChange(this.props.book)
    }

    render(){
       const {book, shelfKey} = this.props

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail : ""})` }}></div>
                        
                        <div className="book-shelf-changer">
                            <select value={shelfKey} onChange={this.onShelfChange} data-name="shelf-select">
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors !== undefined && book.authors.map(author => (
                        <div key={author} className="book-authors" data-name="book-authors">{author}</div>
                    ))}
                </div>
            </li>
        )
    }
}

export default Book