import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { bookmarksAtom } from "../atoms/bookmarkAtoms";
import BlogCard from "../components/BlogCard";
import { Bookmark } from "lucide-react";
function Bookmarks() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const handleRemoveBookmark = (id) => {
    setBookmarks((prev) => prev.filter((post) => post.id !== id));
  };
  if (bookmarks.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center p-8 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg">
        <h2 className="mb-6 text-3xl font-extrabold text-white flex justify-center items-center gap-3">
          <Bookmark size={32} />
          No Bookmarks Yet
        </h2>
        <p className="text-white/70 mb-6">
          You haven't saved any posts. Start exploring and bookmark your
          favorite blogs.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white text-white font-semibold relative overflow-hidden group"
        >
          <span className="relative z-10 group-hover:text-black transition">
            Go Back Home
          </span>
          <span className="absolute left-0 bottom-0 w-full h-0 bg-white group-hover:h-full transition-all duration-500"></span>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bookmarks</h1>
      {bookmarks.map((post) => (
        <div key={post.id} className="mb-4">
          <BlogCard post={post} />
          <button
            onClick={() => handleRemoveBookmark(post.id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Remove Bookmark
          </button>
        </div>
      ))}
    </div>
  );
}
export default Bookmarks;
