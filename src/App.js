import './App.css';
import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import './components.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AddBookForm from './components/AddBookForm';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setisFormVisible] = useState(false);

  // -------------------------------------------
  // Fetch all books from API
  // -------------------------------------------
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // -------------------------------------------
  // Add Book (POST)
  // -------------------------------------------
  const handleAddBook = (newBookData) => {
    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBookData)
    })
      .then(response => response.json())
      .then(addedBook => {
        setBooks(prevBooks => [...prevBooks, addedBook]);
      })
      .catch(error => {
        console.error("Error adding book:", error);
      });
  };

  // -------------------------------------------
  // Update Book Status (PATCH)
  // -------------------------------------------
  const handleStatusUpdate = (bookId, newStatus) => {
    fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book.id === bookId ? updatedBook : book
          )
        );
      })
      .catch(error => {
        console.error("Error updating book status:", error);
      });
  };

  // -------------------------------------------
  // Search Filter
  // -------------------------------------------
  const filteredBooks = books.filter(book => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(lowerSearch) ||
      book.author.toLowerCase().includes(lowerSearch)
    );
  });

  // -------------------------------------------
  // JSX Output
  // -------------------------------------------
  return (
    <div className="app-container">

      {/* Header with button to add new book */}
      <Header onAddNewBookClick={() => setisFormVisible(true)} />

      <main>
        {/* Search functionality */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Book list + status update handler */}
        <BookList 
          books={filteredBooks} 
          onStatusUpdate={handleStatusUpdate} 
        />
      </main>

      {/* Add Book Modal */}
      {isFormVisible && (
        <AddBookForm
          onAddBook={handleAddBook}
          onCloseForm={() => setisFormVisible(false)}
        />
      )}
    </div>
  );
}

export default App;
