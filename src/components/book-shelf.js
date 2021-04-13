import Book from "./book";
import React, { useState } from 'react';

export default function BookShelf(props) {
    const [shelf] = useState(props.shelf)
    const [BookList, setBookList] = useState(props.BookList)

    React.useEffect(() => {
        setBookList(props.BookList);
        
    });
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        BookList && BookList.length > 0 &&
                        BookList.map((b, i) => {
                            return (<li key={i} >
                                <Book onChanging={props.onChange} key={b.id} book={b} />
                            </li>)
                        })
                    }
                </ol>
            </div>
        </div>
    )
}