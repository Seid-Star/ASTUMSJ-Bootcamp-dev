<div align="center">

# 📝 My To-Do List

A clean, minimal to-do list app built with pure HTML, CSS, and JavaScript.
No frameworks. No dependencies. Just open it and go.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

📂 Part of the [ASTUMSJ Bootcamp Dev](https://github.com/Seid-Star/ASTUMSJ-Bootcamp-dev) project collection

</div>

---

## ✨ Features

|                             |                                                                |
| --------------------------- | -------------------------------------------------------------- |
| ✅ **Add tasks**            | Type a task and hit **Add** or press **Enter**                 |
| 🚫 **Smart validation**     | Blocks empty input and duplicate tasks (case-insensitive)      |
| ✔️ **Mark done / undo**     | Toggle any task's completion status                            |
| 🗑️ **Delete tasks**         | Remove a single task instantly                                 |
| 🧹 **Clear all**            | Wipe the entire list in one click                              |
| 📊 **Live counters**        | "Tasks remaining" + "X of Y completed" update in real time     |
| 🎉 **All-done celebration** | A congratulatory message appears when everything's checked off |
| 🎨 **Color picker**         | 7 preset background colors to personalize your list            |

---

## 🖥️ Preview

<div align="center">
  <img src="preview.png.png" alt="To-Do List app screenshot" width="480">
</div>

> 💡 Add a screenshot or GIF named `preview.png` to the repo root so it renders here on GitHub.

---

## 🌐 Live Demo

👉 https://2nd-todoapp.netlify.app/

## 🚀 Quick Start

```bash
git clone https://github.com/Seid-Star/ASTUMSJ-Bootcamp-dev.git
cd ASTUMSJ-Bootcamp-dev/TODO-APP
```

Then just open `index.html` in your browser — no build step, no server, no install.

For live-reload while editing, try the [Live Server VS Code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

---

## 📁 Project Structure

```
.
├── index.html      # Markup & structure
├── style.css       # Styling, layout, and color themes
├── script.js       # App logic & DOM interactions
└── LOGO.avif       # Favicon
```

---

## ⚙️ How It Works

- Tasks live in memory as an array of `{ text, done }` objects in `script.js`.
- `render()` redraws the task list, counters, and celebration message any time the array changes.
- Duplicate checks are case-insensitive to catch things like `"Milk"` vs `"milk"`.
- The color picker sets `document.body.style.backgroundColor` and highlights the active swatch with a `.active` class.

> ⚠️ **Tasks aren't saved between sessions** — refreshing the page resets the list. See below for an easy fix.

---

## 🛣️ Roadmap

- [ ] Persist tasks with `localStorage`
- [ ] Drag-and-drop reordering
- [ ] Due dates & priority levels
- [ ] Inline task editing
- [ ] Filter view (All / Active / Completed)

---

## 🧰 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — Flexbox layout, transitions, custom theming
- **JavaScript (ES6+)** — DOM manipulation, event handling

---

## 📬 Contact

GitHub: https://github.com/Seid-Star

LinkedIn: https://www.linkedin.com/in/seid-jemal-b244b0419

Email: seidjemalali@gmail.com

## 📄 License

Released under the [MIT License](LICENSE) — free to use, modify, and share.

<div align="center">

Made with 🖤 and vanilla JS

</div>
