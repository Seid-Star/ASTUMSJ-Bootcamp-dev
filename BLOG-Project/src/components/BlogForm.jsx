import React, { useState } from "react";
function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Title is required");
      return;
    }
    setError("");
    onSubmit({
      title,
      content,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-bold">Create New Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-white/30 bg-white/10 backdrop-blur-md p-2 rounded w-full text-white placeholder-white/100"
      />
      <textarea
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-white/30 bg-white/10 backdrop-blur-md p-2 rounded w-full text-white placeholder-white/100 x                                                                                                                                                      mt-4"
      />
      <button
        onClick={handleSubmit}
        className="relative overflow-hidden mt-4 px-4 py-2 rounded border-2 border-white text-white font-semibold group"
      >
        <span className="relative z-10 group-hover:text-black transition">
          Create Post
        </span>
        <span className="absolute left-0 bottom-0 w-full h-0 bg-white group-hover:h-full transition-all duration-500"></span>
      </button>
    </form>
  );
}
export default BlogForm;
