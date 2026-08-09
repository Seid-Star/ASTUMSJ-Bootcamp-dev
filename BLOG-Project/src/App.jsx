import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreatePost from "./pages/CreatePost";
import Bookmarks from "./pages/Bookmarks";
import Navbar from "./components/Navbar";

function App() {
  const [newPosts, setNewPosts] = useState([]);
  const handleAddPost = (post) => {
    setNewPosts((prev) => [post, ...prev]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00FF7F] via-[#0B3D2E] to-[#0F0F0F]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home newPosts={newPosts} />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route
          path="/create"
          element={<CreatePost onAddPost={handleAddPost} />}
        />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </div>
  );
}

export default App;
