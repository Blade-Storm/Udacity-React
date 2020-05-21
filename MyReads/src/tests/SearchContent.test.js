import React from 'react'
import Enzyme from 'enzyme'
import {Route} from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom'
import SearchContent from '../SearchContent'
import {shelves} from '../BookContent'
import Book from '../Book'


Enzyme.configure({ adapter: new Adapter() });

/**
 * Tests for the Book component
 */
describe("Search Content", () => {
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


    test("Renders books that were returned from a search", () => {
        wrapper = Enzyme.mount(
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <SearchContent books={books}></SearchContent>
                )} 
            /></BrowserRouter>
        )
        expect(wrapper.find(Book).length).toBe(books.length)
    })

    test("Doesnt render books when none are returned from a search", () => {
        wrapper = Enzyme.mount(
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <SearchContent books={undefinedBooks}></SearchContent>
                )} 
            /></BrowserRouter>
        )
        expect(wrapper.find(Book).length).toBe(0)
    })
})