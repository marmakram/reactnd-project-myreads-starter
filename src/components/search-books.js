import Book from './book';
import { getAll, search } from '../BooksAPI';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";

class SearchBook extends React.Component {
    //const history = useHistory();
    state = {
        allBooks: [],
        isLoading: false,
        query: ''
    }
    constructor(props) {
        super(props);
        this.state.onChangeSearch = props.onChangeSearch;
        this.goBack = this.goBack.bind(this); // i think you are missing this
    }

    goBack() {
        this.props.history.push('/');//.goBack();
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        this.getAllBooks();
    }

    getAllBooks() {
        getAll().then(books => {
            if (Array.isArray(books)) {
                this.setState({
                    allBooks: books
                })
            }
            this.setState({
                isLoading: false
            })
        });
    }
    
    handleSearchQuery = query => {
        console.log(query);
        this.setState({
            query: this.state.query
        })
        //let res = query === '' ? this.state.allBooks ? this.state.allBooks.filter(p.)
        this.setState({
            isLoading: true
        })
        if(query === '') {
            this.getAllBooks();
            return;
        }
        search(query).then(books => {
            if (books === null || books.error) {
                this.setState({
                    allBooks: []
                })
            }
            if (Array.isArray(books)) {
                this.setState({
                    allBooks: books
                })
            }
            this.setState({
                isLoading: false
            })
        })
    }
    render() {
        //here is the code of query
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={this.goBack}>Close</button>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author"
                            onChange={event => this.handleSearchQuery(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    {
                        this.state.isLoading === true && <center><Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100} />
                        </center>
                    }
                    {this.state.isLoading === false && (this.state.allBooks.length === 0 && <h3>No Data :(</h3>)}
                    <ol className="books-grid">
                        {
                            this.state.isLoading === false && this.state.allBooks.map((b, i) => {
                                return <li key={b.id} ><Book onChanging={this.state.onChangeSearch} key={b.id + i.toString()} book={b} /></li>
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}
export default withRouter(SearchBook);