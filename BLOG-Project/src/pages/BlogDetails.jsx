import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { bookmarksAtom } from "../atoms/bookmarkAtoms";
import SkeletonCard from "../components/SkeletonCard";
function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        setError(err.message);
      });
    fetch(`https://dummyjson.com/comments/post/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        return res.json();
      })
      .then((data) => {
        setComments(data.comments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="max-w-md mx-auto mt-10 p-8 text-center 
                    bg-white/10 backdrop-blur-xl 
                    border border-red-400/40 
                    rounded-2xl shadow-lg"
      >
        <div
          className="w-16 h-16 mx-auto mb-5 
                      flex items-center justify-center 
                      rounded-full bg-red-500/20"
        >
          <span className="text-4xl text-red-400">!</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">
          Something Went Wrong
        </h2>
        <p className="text-white/70 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-lg 
                   border-2 border-red-400 
                   text-red-300 
                   font-semibold
                   hover:bg-red-400 
                   hover:text-black
                   transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }
  if (!post) {
    return <h2>Post not found</h2>;
  }
  const isBookmarked = bookmarks.some((item) => item.id === post.id);
  const handleBookmark = () => {
    const alreadyBookmarked = bookmarks.some((item) => item.id === post.id);
    if (!alreadyBookmarked) {
      setBookmarks((prev) => [...prev, post]);
    }
  };
  const handleRemoveBookmark = () => {
    setBookmarks((prev) => prev.filter((item) => item.id !== post.id));
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 shadow-md"
      >
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <div className="flex gap-2 flex-wrap my-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm "
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-white">{post.body}</p>
      {isBookmarked ? (
        <button
          onClick={handleRemoveBookmark}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Remove Bookmark
        </button>
      ) : (
        <button
          onClick={handleBookmark}
          className="px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition"
        >
          Bookmark
        </button>
      )}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Comments</h2>
      {comments.length === 0 ? (
        <p className="text-white">No comments available.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded-lg p-4 mb-4 shadow text-white"
          >
            <p>{comment.body}</p>
            <small>{comment.user.username}</small>
          </div>
        ))
      )}
    </div>
  );
}
export default BlogDetails;
