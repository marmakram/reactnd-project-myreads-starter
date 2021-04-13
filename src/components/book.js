
import React, { useState } from 'react';

export default function Book(props) {
    const [CurrentBook, setBook] = useState(props.book)
    const [shelf, setshelf] = useState(props.book.shelf)

    React.useEffect(() => {
        props.book.shelf = shelf;
        setBook(props.book);
        
    });
    const change = event => { 
        setshelf(event.target.value)
        props.onChanging(CurrentBook, event.target.value );
    }
    return ( CurrentBook && (
            <div className="book">
                <div className="book-top">
                    {CurrentBook.imageLinks &&<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + CurrentBook.imageLinks.smallThumbnail + '")' }}></div>}
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={change}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{CurrentBook.title}</div>
                {CurrentBook.authors && <div className="book-authors">{CurrentBook.authors.join(', ')} </div>}
            </div>
        )
    );
}