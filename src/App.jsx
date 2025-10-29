import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const data = await response.json();
    setBooks(data.items || []);
  };

  return (
    <div className="app-container">
      <div className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
          alt="Book icon"
          className="book-icon"
        />
        <h1 className="title">Book Finder</h1>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder=" Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => {
            const info = book.volumeInfo;
            return (
              <div key={book.id} className="book-card">
                <img
                  src={
                    info.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/128x195?text=No+Cover"
                  }
                  alt={info.title}
                />
                <h3>{info.title}</h3>
                <p>
                  {info.authors ? info.authors.join(", ") : "Unknown Author"}
                </p>
              </div>
            );
          })
        ) : (
          <p className="no-results">Search for books to see results!</p>
        )}
      </div>
    </div>
  );
}
