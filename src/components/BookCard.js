import React from 'react';
import ProgressBar from './ProgressBar';
import PropTypes from 'prop-types';
import { STATUSES } from '../data/constants';  // ✅ import statuses

function BookCard({ book, onStatusUpdate }) {   // ✅ ensure prop included
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Genre: {book.genre}</p>

      {/* ------------- Status Dropdown ------------- */}
      <div className="book-card-status">
        Status:&nbsp;
        <select
          className="status-select"
          value={book.status}
          onChange={(e) => onStatusUpdate(book.id, e.target.value)}
        >
          {Object.values(STATUSES).map((statusInfo) => (
            <option 
              key={statusInfo.id} 
              value={statusInfo.id}
            >
              {statusInfo.label}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        progress={book.progress} 
        totalPages={book.totalPages} 
      />
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number,
    genre: PropTypes.string,
    status: PropTypes.string.isRequired,
    progress: PropTypes.number,
    totalPages: PropTypes.number,
  }).isRequired,

  onStatusUpdate: PropTypes.func.isRequired   // ✅ added
};

export default BookCard;
