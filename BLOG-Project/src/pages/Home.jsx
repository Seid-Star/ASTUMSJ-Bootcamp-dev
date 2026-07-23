import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import SkeletonCard from "../components/SkeletonCard";
function Home({ newPosts = [] }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState("all");
  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const allPosts = [...newPosts, ...posts];
  const tags = ["all", ...new Set(allPosts.flatMap((post) => post.tags))];
  const filteredPosts =
    selectedTag === "all"
      ? allPosts
      : allPosts.filter((post) => post.tags.includes(selectedTag));
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
  if (error && newPosts.length === 0) {
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
          <span className="text-4xl text-red-400 font-bold">!</span>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-3">
          Failed to Create Post
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
  if (allPosts.length === 0) {
    return <h2>No posts available</h2>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && (
        <p className="text-red-500 mb-4">
          Couldn't load posts from the server, showing local posts only.
        </p>
      )}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className="relative overflow-hidden px-3 py-1 border rounded group"
          >
            <span
              className={`absolute left-0 top-0 h-full bg-black transition-all duration-500 ${
                selectedTag === tag ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>

            <span
              className={`relative z-10 transition-colors duration-500 ${
                selectedTag === tag ? "text-white" : "group-hover:text-white"
              }`}
            >
              {tag}
            </span>
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <h2>No posts found for this tag</h2>
        ) : (
          filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
export default Home;
