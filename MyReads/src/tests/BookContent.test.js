import React from 'react'
import Enzyme from 'enzyme'
import {Route} from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom'
import BookContent, {shelves} from '../BookContent'
import Book from '../Book'


Enzyme.configure({ adapter: new Adapter() });

/**
 * Tests for the Book component
 */
describe("Book Content", () => {
    const books = [
        {
            shelf: "none",
            id: 1,
            title: "Book Title for None",
        },
        {
            shelf: shelves[2].key,
            id: 2,
            title: "Book Title for Read",
        },
        {
            shelf: shelves[1].key,
            id: 3,
            title: "Book Title for Want to Read",
        },
        {
            shelf: shelves[0].key,
            id: 4,
            title: "Book Title for Currently Reading",
        }
    ]
    const undefinedBooks = []
    let wrapper

    afterEach(() => {
        wrapper.unmount()
    })


    test("Renders book shelves for each category", () => {
        wrapper = Enzyme.mount(
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <BookContent></BookContent>
                )} 
            /></BrowserRouter>
        )
        expect(wrapper.find('[data-name="book-shelf"]').length).toBe(shelves.length)
    })

    test("Renders books in each shelf", () => {
        wrapper = Enzyme.mount(
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <BookContent books={books}></BookContent>
                )} 
            /></BrowserRouter>
        )
        expect(wrapper.find(Book).length).toBe(books.length - 1) // Subtract 1 because there isnt a "none" shelf
    })

    test("Doesnt render the Book component if there arent any books", () => {
        wrapper = Enzyme.mount(
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <BookContent books={undefinedBooks}></BookContent>
                )} 
            /></BrowserRouter>
        )
        expect(wrapper.find(Book).length).toBe(0)
    })
})