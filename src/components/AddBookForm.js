import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddBookForm({ onAddBook, onCloseForm }) {

  // ---- State for form data ----
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: ''
  });

  // ---- Handle input changes ----
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ---- Handle form submission ----
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.author || !formData.totalPages) {
      alert("Please fill in all fields.");
      return;
    }

    // Build newBook object
    const newBook = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      totalPages: parseInt(formData.totalPages, 10),
      year: new Date().getFullYear(),
      genre: 'Unknown',
      status: 'wantToRead',
      progress: 0
    };

    // Pass new book upward
    onAddBook(newBook);

    // Reset form
    setFormData({
      title: '',
      author: '',
      totalPages: ''
    });

    // Close modal
    onCloseForm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content add-book-form">
        <h2>Add New Book</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label htmlFor="author">Author:</label>
            <input 
              type="text" 
              id="author" 
              name="author" 
              value={formData.author} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label htmlFor="totalPages">Total Pages:</label>
            <input 
              type="number" 
              id="totalPages" 
              name="totalPages" 
              value={formData.totalPages} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Book</button>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onCloseForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddBookForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired
};

export default AddBookForm;
