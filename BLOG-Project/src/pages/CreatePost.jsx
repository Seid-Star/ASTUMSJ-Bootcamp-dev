import React from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
function CreatePost({ onAddPost }) {
  const navigate = useNavigate();
  const handleAddPost = (postData) => {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      body: postData.content,
      tags: [],
    };
    onAddPost(newPost);
    navigate("/");
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">
        Create New{" "}
        <span className="border-b-4 border-white pb-2 rounded-b-lg">Post</span>
      </h1>

      <BlogForm onSubmit={handleAddPost} />
    </div>
  );
}
export default CreatePost;
