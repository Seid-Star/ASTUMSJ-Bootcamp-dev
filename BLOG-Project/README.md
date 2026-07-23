# 📝 MinimalistBlog

A modern personal blog application built with **React + Vite**.

Users can browse blog posts fetched from a live API, view full post details with comments, create their own posts locally, filter posts by tags, and bookmark favorite posts using global state management.

---

## 🔗 Links

🌍 **Live Website:** https://blog-project-rose-tau.vercel.app/

💻 **GitHub Repository:** https://github.com/Seid-Star/ASTUMSJ-Bootcamp-dev

---

---

# 📸 Screenshots

## 🏠 Home Page

Browse blog posts, filter by tags, and view likes/comments.

![Home Page](/BLOG-Project/public/Screenshot/photo_2026-07-19_01-53-50.jpg)

## ✍️ Create Post

Create a new blog post with form validation.

![Create Post](/BLOG-Project/public/Screenshot/photo_2026-07-19_01-54-03.jpg)

## 🔖 Bookmarks

View and manage saved favorite posts.

![Bookmarks](/BLOG-Project/public/Screenshot/photo_2026-07-19_01-54-09.jpg)

---

# ✨ Features

## 🏠 Home Page

- Fetches blog posts from the **DummyJSON API**
- Displays posts using reusable Blog Card components
- Tag-based filtering
- Shows likes and comment counts
- Responsive design

## 📖 Blog Details Page

- Dynamic routing using `/blog/:id`
- Displays:
  - Full blog content
  - Tags
  - Comments
  - Bookmark functionality
- Loading and error handling states

## ✍️ Create Post

- Create new blog posts locally
- Controlled form inputs
- Input validation
- Redirects to Home after submission

## 🔖 Bookmarks

- Save favorite posts
- Remove bookmarks
- Global state management using **Jotai**

## ⚡ User Experience

- Skeleton loading animations
- Error handling
- Smooth transitions and hover effects
- Glassmorphism UI design

---

# 🛠 Tech Stack

| Technology       | Usage                     |
| ---------------- | ------------------------- |
| React            | Frontend library          |
| Vite             | Development environment   |
| React Router DOM | Routing and dynamic pages |
| Jotai            | Global state management   |
| Tailwind CSS     | Styling                   |
| DummyJSON API    | Blog data and comments    |

---

# 📁 Project Structure

```
src/
│
├── atoms/
│   └── bookmarkAtoms.jsx
│
├── components/
│   ├── BlogCard.jsx
│   ├── BlogForm.jsx
│   ├── Navbar.jsx
│   └── SkeletonCard.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── BlogDetails.jsx
│   ├── CreatePost.jsx
│   └── Bookmarks.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/Seid-Star/ASTUMSJ-Bootcamp-dev.git
```

## Navigate into the project folder

```bash
cd blog-app
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Open your browser:

```
http://localhost:5173
```

---

# 🌐 API Reference

This project uses the **DummyJSON API**.

| Purpose         | Endpoint                                  |
| --------------- | ----------------------------------------- |
| Get posts       | `https://dummyjson.com/posts?limit=10`    |
| Get single post | `https://dummyjson.com/posts/:id`         |
| Get comments    | `https://dummyjson.com/comments/post/:id` |

No API key or authentication is required.

---

# 📄 Application Routes

| Route        | Page         | Description                  |
| ------------ | ------------ | ---------------------------- |
| `/`          | Home         | Browse and filter blog posts |
| `/blog/:id`  | Blog Details | View full post and comments  |
| `/create`    | Create Post  | Create a new local post      |
| `/bookmarks` | Bookmarks    | View saved posts             |

---

# 📦 Deployment

The application is deployed using **Vercel**.

🌍 Live Website:

```
https://blog-project-rose-tau.vercel.app/
```

---

# 📚 Learning Outcomes

This project helped practice:

- JSX fundamentals
- React components
- Props
- State management
- Event handling
- Conditional rendering
- React Router
- Dynamic routes
- `useEffect`
- API integration
- Loading and error states
- Global state with Jotai
- Tailwind CSS styling

---

# 🔮 Future Improvements

Possible future features:

- User authentication
- Backend database integration
- Markdown editor
- Search functionality
- User profiles
- Image upload support
- Dark/light theme switch

---

# 👨‍💻 Author

Built by **Seid Jemal** using React.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)
