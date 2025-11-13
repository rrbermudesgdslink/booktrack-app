import React from 'react';
import BookCard from './BookCard';
function BookList({ books }) {
  // We will return JSX here

return (
      <div className="book-list">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
    
    
}
export default BookList;
