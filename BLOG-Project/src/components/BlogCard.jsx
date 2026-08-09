import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function BlogCard({ post }) {
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    fetch(`https://dummyjson.com/comments/post/${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentCount(data.comments.length);
      })
      .catch(() => {
        setCommentCount(0);
      });
  }, [post.id]);
  return (
    <Link to={`/blog/${post.id}`}>
      <div className="relative p-5 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer bg-[url('\public\photo-1638342863994-ae4eee256688.avif')] bg-cover bg-center bg-[url('/blog-bg.jpg')]">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
        <div className="relative z-10">
          <img
            src={`https://picsum.photos/600/300?random=${post.id}`}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold">{post.title}</h2>
          <div className="flex gap-2 mt-3 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/40 backdrop-blur rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-sm text-gray-700">
            <p>❤️ {post.reactions?.likes || 0} likes</p>
            <p>💬 {commentCount} comments</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default BlogCard;
