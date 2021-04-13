

import React from 'react';
import './App.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BookShelf} from './components/main';
import { getAll, update } from './BooksAPI';

export default class Home extends React.Component {
    state = {
        allBooks: [],
        displayedCurrentlyReadingBooks: [],
        displayedWantToReadBooks: [],
        displayedReadBooks: [],
        isLoading: false
    }

    handleChangeShelf = (book, shelf) => {
        update(book, shelf).then(a => {
            this.setState({
                displayedCurrentlyReadingBooks: this.state.allBooks.filter(x => a.currentlyReading.includes(x.id)),
                displayedWantToReadBooks: this.state.allBooks.filter(x => a.wantToRead.includes(x.id)),
                displayedReadBooks: this.state.allBooks.filter(x => a.read.includes(x.id))
            });

        });
    }

    getAllBooks() {
        getAll().then(books => {
            if (Array.isArray(books)) {
                this.setState({
                    allBooks: books
                });
                this.setState({
                    displayedCurrentlyReadingBooks: books.filter(a => a.shelf === "currentlyReading"),
                    displayedWantToReadBooks: books.filter(a => a.shelf === "wantToRead"),
                    displayedReadBooks: books.filter(a => a.shelf === "read")
                })
            }
            this.setState({
                isLoading: false
            })
        });
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        this.getAllBooks();
    }

    render() {
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">

                        <BookShelf shelf="currently Reading"
                            key="Currently Reading" BookList={this.state.displayedCurrentlyReadingBooks}
                            onChange={this.handleChangeShelf} />

                        <BookShelf shelf="Want To Read" key="wantToRead"
                            BookList={this.state.displayedWantToReadBooks} onChange={this.handleChangeShelf} />

                        <BookShelf shelf="Read" key="read" BookList={this.state.displayedReadBooks}
                            onChange={this.handleChangeShelf} />

                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.handleClick()}></button>
                </div>
                {/* <div className="open-search">
                <Link to={{
                    pathname: '/search',
                    state: { onChange: this.handleChangeShelf }
                }}> My Link </Link>
            </div> */}
            </div>
        );
    }
    handleClick() {
        this.props.history.push({ pathname: "/search" })
    }
}
