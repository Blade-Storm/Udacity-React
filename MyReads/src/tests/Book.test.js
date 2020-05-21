import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Book from '../Book'

Enzyme.configure({ adapter: new Adapter() });

/**
 * Tests for the Book component
 */
describe("Book", () => {
    const bookWithoutAuthors = {
        title: "Book Title",
        imageLinks: {
            thumbnail: "google.com"
        }
    }
    const bookWithAuthors = {
        title: "Book Title",
        imageLinks: {
            thumbnail: "google.com"
        },
        authors: ["Tim Morray", "Michael Balle"]
    }
    const bookWithoutImageLinks = {
        title: "Book Title",
        authors: ["Tim Morray", "Michael Balle"]
    }
    const shelfKey = "none"
    let wrapper

    afterEach(() => {
        wrapper.unmount()
    })


    test("Renders book", () => {
        wrapper = Enzyme.mount(<Book book={bookWithoutAuthors} shelfKey={shelfKey}></Book>)
        expect(wrapper.find(Book).length).toBe(1)
    })

    test("Renders authors when the book has them", () => {
        wrapper = Enzyme.mount(<Book book={bookWithAuthors} shelfKey={shelfKey}></Book>)
        expect(wrapper.find("[data-name='book-authors']").length).toBe(2)
    })

    test("Doesnt render the authors when the book doesnt have any", () => {
        wrapper = Enzyme.mount(<Book book={bookWithoutAuthors} shelfKey={shelfKey}></Book>)
        expect(wrapper.find("[data-name='book-authors']").length).toBe(0)
    })

    test("Renders book when there arent any ImageLinks", () => {
        wrapper = Enzyme.mount(<Book book={bookWithoutImageLinks} shelfKey={shelfKey}></Book>)
        expect(wrapper.find(Book).length).toBe(1)
    })
})