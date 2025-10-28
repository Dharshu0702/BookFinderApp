import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 20)); // show top 20 results
    } catch (err) {
      setError("Something went wrong while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800 p-4 sm:p-6">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-blue-700 drop-shadow-sm">
        📚 Book Finder
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={searchBooks}
        className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-2xl mx-auto mb-8"
      >
        <input
          type="text"
          placeholder="🔍 Search books by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full sm:w-auto sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-medium shadow-md"
        >
          Search
        </button>
      </form>

      {/* Loading & Error */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Book Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
        {books.map((book) => (
          <div
            key={book.key}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-transform duration-200"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x200?text=No+Cover"
              }
              alt={`Book cover for ${book.title}`}
              className="w-32 h-48 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-sm sm:text-base mb-1 text-gray-800">
              {book.title.length > 40
                ? book.title.slice(0, 40) + "..."
                : book.title}
            </h3>
            <p className="text-xs text-gray-600 mb-1 italic">
              {book.author_name ? book.author_name[0] : "Unknown Author"}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              {book.first_publish_year || "N/A"}
            </p>
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 text-xs mt-auto hover:underline"
            >
              View on OpenLibrary →
            </a>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && books.length === 0 && query && !error && (
        <p className="text-center text-gray-600 mt-10 text-sm sm:text-base">
          No books found for “{query}”.
        </p>
      )}
    </div>
  );
}

export default App;
